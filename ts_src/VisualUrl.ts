import UrlData = require("UrlData");

class VisualUrl { 

    private _selection: number = -1;
    private _listeners = new Array<{(): void}>();

    constructor(public url: UrlData) { }

    render(): HTMLDivElement {
        var d = document;
        var element = d.createElement("div");
        element.appendChild(d.createTextNode(this.url.protocol + ":// "));

        var index = 0;
        this.url.urlTokens.forEach(token => {
            var urlPart = d.createElement("div");
            urlPart.textContent = token;
            urlPart.classList.add("urltoken");
            
            urlPart.addEventListener("click", ((index) => {
                return () => {
                    this.selection = index;
                    this._listeners.forEach(l => l());
                };
            })(index));

            element.appendChild(urlPart);
            element.appendChild(d.createTextNode(" / "));
            index++;
        });

        return element;
    }

    public set selection(selection: number) {
        this._selection = selection;
    }

    public get selection(): number {
        return this._selection;
    }

    addOnSelectionListener(listener: { (): void }): void {
        this._listeners.push(listener);
    }

}

export = VisualUrl;