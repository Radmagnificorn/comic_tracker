define(["require", "exports", "UrlData", "SaveData"], function(require, exports, UrlData, SaveData) {
    var Series = (function () {
        function Series(saveData) {
            if (saveData) {
                this.title = saveData.title;
                this.lastUrl = new UrlData(saveData.lastUrl);
                this.seriesIdentifier = parseInt(saveData.seriesIdentifier);
                this.pageIdentifier = parseInt(saveData.pageIdentifier);
            }
        }
        Series.prototype.splitSearchStringFromPageId = function (seriesId) {
            var page = seriesId.match(/(\d+)/g) + "";
            var pagePos = seriesId.indexOf(page);
            var subId = "";
            if (pagePos < seriesId.length / 2) {
                subId = seriesId.substring(pagePos + page.length, seriesId.length);
            } else {
                subId = seriesId.substring(0, pagePos);
            }

            return subId;
        };

        Series.prototype.getSaveData = function () {
            return new SaveData(this.title, this.lastUrl.url, this.seriesIdentifier.toString(), this.pageIdentifier.toString());
        };

        Series.prototype.getFurthestRead = function () {
            return this.lastUrl.parsePageNumber(this.pageIdentifier);
        };

        Series.prototype.getSearchString = function () {
            var seriesString = this.lastUrl.urlTokens[this.seriesIdentifier];
            var searchString = "";
            if (this.seriesIdentifier === this.pageIdentifier) {
                searchString = this.splitSearchStringFromPageId(seriesString);
            } else {
                searchString = seriesString;
            }
            return searchString;
        };

        Series.prototype.toString = function () {
            return JSON.stringify(this.getSaveData());
        };
        return Series;
    })();

    
    return Series;
});
