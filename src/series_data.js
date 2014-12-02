define("series_data", ["url_data"], function (UrlData) {

    function SeriesData(/* save data */) {

        if (arguments.length > 0) {
            var saveData = arguments[0];
            this.title = saveData.title;
            this.lastUrl = saveData.lastUrl;
            this.seriesIdentifier = saveData.seriesIdentifier;
            this.pageIdentifier = saveData.pageIdentifier;
            this.url = new UrlData(this.lastUrl);
            this.seriesSearchString = saveData.seriesSearchString;
        }
    }

    SeriesData.prototype = {
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
            return this.url.parsePageNumber(this.pageIdentifier);
        }
    };

    return SeriesData;

});