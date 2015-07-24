define(["require", "exports"], function(require, exports) {
    var VisualUrl = (function () {
        function VisualUrl(url) {
            this.url = url;
            this._selection = -1;
            this._listeners = new Array();
        }
        VisualUrl.prototype.render = function () {
            var _this = this;
            var d = document;
            var element = d.createElement("div");
            element.appendChild(d.createTextNode(this.url.protocol + ":// "));

            var index = 0;
            this.url.urlTokens.forEach(function (token) {
                var urlPart = d.createElement("div");
                urlPart.textContent = token;
                urlPart.classList.add("urltoken");

                urlPart.addEventListener("click", (function (index) {
                    return function () {
                        _this.selection = index;
                        _this._listeners.forEach(function (l) {
                            return l();
                        });
                    };
                })(index));

                element.appendChild(urlPart);
                element.appendChild(d.createTextNode(" / "));
                index++;
            });

            return element;
        };


        Object.defineProperty(VisualUrl.prototype, "selection", {
            get: function () {
                return this._selection;
            },
            set: function (selection) {
                this._selection = selection;
            },
            enumerable: true,
            configurable: true
        });

        VisualUrl.prototype.addOnSelectionListener = function (listener) {
            this._listeners.push(listener);
        };
        return VisualUrl;
    })();

    
    return VisualUrl;
});
