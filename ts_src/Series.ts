

import UrlData = require("UrlData");
import SaveData = require("SaveData");

class Series {

    title: string;
    seriesIdentifier: number;
    pageIdentifier: number;
    lastUrl: UrlData;

    constructor(saveData?: SaveData) {
        if (saveData) {
            this.title = saveData.title;
            this.lastUrl = new UrlData(saveData.lastUrl);
            this.seriesIdentifier = parseInt(saveData.seriesIdentifier);
            this.pageIdentifier = parseInt(saveData.pageIdentifier);
        }
    }

    private splitSearchStringFromPageId(seriesId: string): string {
        var page = seriesId.match(/(\d+)/g) + "";
        var pagePos = seriesId.indexOf(page);
        var subId = "";
        if (pagePos < seriesId.length / 2) {
            subId = seriesId.substring(pagePos + page.length, seriesId.length);
        } else {
            subId = seriesId.substring(0, pagePos);
        }

        return subId;
    }

    getSaveData(): SaveData {
        return new SaveData(
            this.title,
            this.lastUrl.url,
            this.seriesIdentifier.toString(),
            this.pageIdentifier.toString()
        );
    }

    getFurthestRead(): number {
        return this.lastUrl.parsePageNumber(this.pageIdentifier);
    }

    getSearchString(): string {

        var seriesString = this.lastUrl.urlTokens[this.seriesIdentifier];
        var searchString = "";
        if (this.seriesIdentifier === this.pageIdentifier) {
            searchString = this.splitSearchStringFromPageId(seriesString);
        } else {
            searchString = seriesString;
        }
        return searchString;
    }

    toString(): string {
        return JSON.stringify(this.getSaveData());
    }
}

export = Series;

