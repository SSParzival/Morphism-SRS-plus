(function () {
    "use strict";

    window.MorphismPreview = {
        renderPreview: function (payload) {
            var root = document.getElementById("preview-root");
            var titleEl = document.getElementById("preview-title");
            var modeEl = document.getElementById("preview-mode");
            var tagsEl = document.getElementById("preview-tags");
            var premBox = document.getElementById("preview-premise-box");
            var premContent = document.getElementById("preview-premise");
            var cardsContainer = document.getElementById("preview-cards");

            titleEl.textContent = payload.title || "Preview";
            modeEl.textContent = (payload.review_mode || "standard").toUpperCase();

            tagsEl.innerHTML = "";
            (payload.tags || []).forEach(function (t) {
                var s = document.createElement("span");
                s.className = "tag-chip";
                s.textContent = "#" + t;
                tagsEl.appendChild(s);
            });

            if (payload.premise_html && payload.premise_html.trim()) {
                premBox.style.display = "block";
                premContent.innerHTML = payload.premise_html;
            } else {
                premBox.style.display = "none";
                premContent.innerHTML = "";
            }

            var htmlParts = [];
            (payload.cards || []).forEach(function (c, idx) {
                var stepTitle = c.title ? (" — " + c.title) : "";
                htmlParts.push(
                    '<div class="active-card-box">' +
                    '<div class="active-card-step-label">Card ' + (idx + 1) + stepTitle + '</div>' +
                    '<div class="card-front">' + (c.front_html || "") + '</div>' +
                    (c.hint_html ? '<div class="card-hint">' + c.hint_html + '</div>' : '') +
                    '<hr class="answer-divider">' +
                    '<div class="card-back">' + (c.back_html || "") + '</div>' +
                    '</div>'
                );
            });
            cardsContainer.innerHTML = htmlParts.join("");

            if (window.MathJax && window.MathJax.typesetPromise) {
                if (window.MathJax.typesetClear) {
                    window.MathJax.typesetClear([root]);
                }
                window.MathJax.typesetPromise([root]).catch(function (err) {
                    console.error("Preview MathJax error:", err);
                });
            }
        }
    };
})();
