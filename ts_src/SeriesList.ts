/// <reference path="../Scripts/typings/es6-promise/es6-promise.d.ts"/>

import Dao = require("Dao");
import Series = require("Series");

class SeriesList {

    seriesList: Series[];
    private dao: Dao;

    constructor(dao: Dao) {
        this.dao = dao;
        this.seriesList = new Array<Series>();
    }

    populateList(): Promise<void> {
        var promise = new Promise<void>((resolve, reject) => {
            this.dao.loadSeriesDataList().then(
                list => {
                    this.seriesList = list;
                    resolve();
                }, err => {
                    console.error(err + "unable to populate list");
                    reject(err);
                }
            );
        });

        return promise;
    }

    save(): Promise<void> {
        return this.dao.saveSeriesDataList(this.seriesList);
    }

    addSeries(series: Series): void {
        this.seriesList.push(series);
        this.save();
    }

    removeSeries(index: number): void {
        this.seriesList.splice(index, 1);
        this.save();
    }

    generateUi(): HTMLUListElement {
        var d = document;
        var element = d.createElement("ul");
 
        var delId = 0;
        
        this.seriesList.forEach(seriesData => {
            
            var pageNumber = seriesData.getFurthestRead();
            
            var li = d.createElement("li");
            var comicLink = d.createElement("a");
            var deleteLink = d.createElement("a");
            comicLink.href = seriesData.lastUrl.url;
            comicLink.target = "_blank";
            comicLink.textContent = seriesData.title + " (" + pageNumber + ") ";

            deleteLink.href = "#";
            deleteLink.textContent = "delete";
            deleteLink.addEventListener("click", (delId => () => {
                this.removeSeries(delId);
            })(delId));
            deleteLink.classList.add("delButton");

            li.appendChild(comicLink);
            li.appendChild(deleteLink);

            element.appendChild(li);
                
            delId++;
        });


        return element;
    }

}

export = SeriesList;