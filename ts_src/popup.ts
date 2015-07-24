/// <reference path="../Scripts/typings/chrome/chrome-app.d.ts"/>
/// <reference path="../Scripts/typings/chrome/chrome.d.ts"/>

import Series = require("Series");
import SeriesList = require("SeriesList");
import SaveData = require("SaveData");
import UrlData = require("UrlData");
import Dao = require("Dao");
import VisualUrl = require("VisualUrl");
import DataAdapters = require("DataAdapters");




class Popup {

    private static step1 = <HTMLDivElement>document.getElementById("step1");
    private static step2 = <HTMLDivElement>document.getElementById("step2");
    private static step3 = <HTMLDivElement>document.getElementById("step3");
    private static slContainer = <HTMLDivElement>document.getElementById("seriesList");

    private static newComic: Series;
    private static seriesList = new SeriesList(new Dao(new DataAdapters.LSAdapter()));

    static init(): void {
        this.newComic = new Series();

        this.seriesList.populateList().then(() => {
            
            this.slContainer.appendChild(this.seriesList.generateUi());
            this.createStep1();
        }, err => {console.error(err + "unable to load")});
       
    }

    private static createStep1(): void {
        var addButton = <HTMLButtonElement>document.getElementById("addComic");
        var nextButton = <HTMLButtonElement>document.getElementById("saveTitle");
        var titleInput = <HTMLInputElement>document.getElementById("comicTitle");

        addButton.addEventListener("click", () => {
            this.step1.classList.add("show");
        });

        
        nextButton.addEventListener("click", () => {
            this.newComic.title = titleInput.value;
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
                var pageUrl = new UrlData(tabs[0].url);
                this.newComic.lastUrl = pageUrl;
                this.createStep2(pageUrl);
                this.step2.classList.add("show");
            });
            
        });

    }

    private static createStep2(pageUrl: UrlData): void {
        var urlContainer = <HTMLDivElement>document.getElementById("urlselector");

        var vurl = new VisualUrl(pageUrl);
        vurl.addOnSelectionListener(() => {
            this.newComic.seriesIdentifier = vurl.selection;
            this.createStep3(pageUrl);
        });

        urlContainer.appendChild(vurl.render());
    }

    private static createStep3(pageUrl: UrlData): void {
        var pageContainer = <HTMLDivElement>document.getElementById("pageselector");

        var vurl = new VisualUrl(pageUrl);
        vurl.addOnSelectionListener(() => {
            this.newComic.pageIdentifier = vurl.selection;
            this.seriesList.addSeries(this.newComic);
            this.seriesList.save();
            this.hideAddComic();
            this.slContainer.innerHTML = "";
            this.slContainer.appendChild(this.seriesList.generateUi());
        });

        pageContainer.appendChild(vurl.render());

        this.step3.classList.add("show");
    }

    private static hideAddComic() {
        this.step1.classList.remove("show");
        this.step2.classList.remove("show");
        this.step3.classList.remove("show");
        
    }
}



Popup.init();