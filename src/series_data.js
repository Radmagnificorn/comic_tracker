define("series_data", ["url_data"], function (UrlData) {

    function SeriesData(/* save data */) {

        if (arguments.length > 0) {
            var saveData = arguments[0];
            this.title = saveData.title;
            this._lastUrl = new UrlData(saveData.lastUrl);
            this.seriesIdentifier = saveData.seriesIdentifier;
            this.pageIdentifier = saveData.pageIdentifier;
            //this.seriesSearchString = saveData.seriesSearchString;
        }
    }

    SeriesData.prototype = (function () {

        //------------- PRIVATE ---------------------
        function splitSearchStringFromPageId(seriesId) {

            var page = seriesId.match(/(\d+)/g) + "";
            var pagePos = seriesId.indexOf(page);
            var subId = "";
            if (pagePos < seriesId.length / 2) {
                subId = seriesId.substring(pagePos + page.length, seriesId.length);
            } else {
                subId = seriesId.substring(0, pagePos);
            }

            return subId
        }

        //------------- PUBLIC ----------------------
        return {
            getSaveData: function () {
                return {
                    title: this.title,
                    lastUrl: this.lastUrl,
                    seriesIdentifier: this.seriesIdentifier,
                    pageIdentifier: this.pageIdentifier,
                    seriesSearchString: this.seriesSearchString
                }
            },
            allDataPresent: function () {
                return (this.title && this.lastUrl && this.seriesIdentifier
                && this.pageIdentifier && this.seriesSearchString);
            },
            getFurthestRead: function () {
                return this._lastUrl.parsePageNumber(this.pageIdentifier);
            },
            getSearchString: function () {
                var seriesString = this.lastUrl.urlTokens[this.seriesIdentifier];
                var searchString = "";
                if (this.seriesIdentifier === this.pageIdentifier) {
                    searchString = splitSearchStringFromPageId(seriesString);
                } else {
                    searchString = seriesString;
                }
                return searchString;
            },
            toString: function () {
                return JSON.stringify(this.getSaveData());
            }

        }
    })();

    return SeriesData;

});