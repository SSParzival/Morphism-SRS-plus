from __future__ import annotations

from pathlib import Path

from PySide6.QtCore import QObject
from PySide6.QtWebEngineCore import QWebEnginePage, QWebEngineProfile, QWebEngineSettings
from PySide6.QtWebEngineWidgets import QWebEngineView

from morphism_srs.storage.media_vault import MediaVault
from morphism_srs.theming.theme_manager import ThemeManager
from morphism_srs.web_engine.scheme_handler import SCHEME_NAME, MorphismSchemeHandler


class WebEngineProfileManager(QObject):
    """Configures a shared offline QWebEngineProfile with MorphismSchemeHandler and theme sync."""

    def __init__(
        self,
        web_root: Path,
        media_vault: MediaVault,
        theme_manager: ThemeManager,
        parent: QObject | None = None,
    ) -> None:
        super().__init__(parent)
        self.web_root = web_root
        self.media_vault = media_vault
        self.theme_manager = theme_manager
        self.profile = QWebEngineProfile("MorphismOfflineProfile", self)
        self.handler = MorphismSchemeHandler(web_root=web_root, media_vault=media_vault, parent=self)
        self.profile.installUrlSchemeHandler(SCHEME_NAME, self.handler)

        settings = self.profile.settings()
        settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls, False)
        settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.JavascriptEnabled, True)

        self._tracked_views: list[QWebEngineView] = []
        self.theme_manager.theme_changed.connect(self._on_theme_changed)

    def create_web_view(self, parent_widget=None) -> QWebEngineView:
        view = QWebEngineView(parent_widget)
        page = QWebEnginePage(self.profile, view)
        page.setBackgroundColor(self.theme_manager.qcolor("bg_primary"))
        view.setPage(page)
        view.loadFinished.connect(lambda ok, v=view: self._inject_theme_into_view(v) if ok else None)
        self._tracked_views.append(view)
        view.destroyed.connect(lambda *_: self._prune_destroyed_views())
        return view

    def _prune_destroyed_views(self) -> None:
        alive: list[QWebEngineView] = []
        for v in self._tracked_views:
            try:
                _ = v.page()
                alive.append(v)
            except RuntimeError:
                continue
        self._tracked_views = alive

    def _inject_theme_into_view(self, view: QWebEngineView) -> None:
        try:
            view.page().setBackgroundColor(self.theme_manager.qcolor("bg_primary"))
            js = self.theme_manager.compile_css_variables_js()
            view.page().runJavaScript(js)
        except RuntimeError:
            pass

    def _on_theme_changed(self, _theme_id: str) -> None:
        self._prune_destroyed_views()
        for v in self._tracked_views:
            self._inject_theme_into_view(v)
