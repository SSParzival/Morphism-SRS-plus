(function () {
    "use strict";

    function typesetElements(elements) {
        if (!window.MathJax) {
            return;
        }
        var doTypeset = function () {
            if (window.MathJax.typesetClear) {
                window.MathJax.typesetClear(elements);
            }
            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise(elements).catch(function (err) {
                    console.error("Preview MathJax error:", err);
                });
            }
        };
        if (window.MathJax.startup && window.MathJax.startup.promise) {
            window.MathJax.startup.promise.then(doTypeset);
        } else {
            doTypeset();
        }
    }

    window.MorphismPreview = {
        renderCardPreview: function (payload) {
            var root = document.getElementById("preview-root");
            var headerEl = document.getElementById("preview-header");
            var titleEl = document.getElementById("preview-title");
            var modeEl = document.getElementById("preview-mode");
            var tagsEl = document.getElementById("preview-tags");
            var cardsContainer = document.getElementById("preview-cards");

            if (headerEl) {
                headerEl.style.display = "none";
            }
            if (tagsEl) {
                tagsEl.style.display = "none";
            }

            var stepNum = (payload.step_index !== undefined ? payload.step_index + 1 : 1);
            var cardTitle = payload.card_title || ("Card " + stepNum);
            cardsContainer.innerHTML =
                '<div class="active-card-box" style="margin-top: 4px;">' +
                '<div class="active-card-step-label">' + cardTitle + '</div>' +
                '<div class="card-front">' + (payload.front_html || "") + '</div>' +
                '<hr class="answer-divider">' +
                '<div class="card-back">' + (payload.back_html || "") + '</div>' +
                '</div>';

            typesetElements([root]);
        },

        renderScratchPreview: function (payload) {
            var root = document.getElementById("preview-root");
            var headerEl = document.getElementById("preview-header");
            var titleEl = document.getElementById("preview-title");
            var modeEl = document.getElementById("preview-mode");
            var tagsEl = document.getElementById("preview-tags");
            var cardsContainer = document.getElementById("preview-cards");

            if (headerEl) {
                headerEl.style.display = "flex";
            }
            if (tagsEl) {
                tagsEl.style.display = "none";
            }
            titleEl.textContent = payload.title || "Scratchbook";
            modeEl.textContent = "SCRATCHPAD";

            cardsContainer.innerHTML =
                '<div class="active-card-box" style="border-color: var(--border-subtle);">' +
                '<div class="card-front">' + (payload.content_html || "") + '</div>' +
                '</div>';

            typesetElements([root]);
        },

        renderPreview: function (payload) {
            var root = document.getElementById("preview-root");
            var headerEl = document.getElementById("preview-header");
            var titleEl = document.getElementById("preview-title");
            var modeEl = document.getElementById("preview-mode");
            var tagsEl = document.getElementById("preview-tags");
            var cardsContainer = document.getElementById("preview-cards");

            if (headerEl) {
                headerEl.style.display = "flex";
            }
            if (tagsEl) {
                tagsEl.style.display = "flex";
            }

            titleEl.textContent = payload.title || "Preview";
            modeEl.textContent = (payload.review_mode || "standard").toUpperCase();

            tagsEl.innerHTML = "";
            (payload.tags || []).forEach(function (t) {
                var s = document.createElement("span");
                s.className = "tag-chip";
                s.textContent = "#" + t;
                tagsEl.appendChild(s);
            });

            var htmlParts = [];
            (payload.cards || []).forEach(function (c, idx) {
                var stepTitle = c.title ? (" — " + c.title) : "";
                htmlParts.push(
                    '<div class="active-card-box">' +
                    '<div class="active-card-step-label">Card ' + (idx + 1) + stepTitle + '</div>' +
                    '<div class="card-front">' + (c.front_html || "") + '</div>' +
                    '<hr class="answer-divider">' +
                    '<div class="card-back">' + (c.back_html || "") + '</div>' +
                    '</div>'
                );
            });
            cardsContainer.innerHTML = htmlParts.join("");

            typesetElements([root]);
        }
    };
})();
