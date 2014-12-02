define("url_data", [], function () {

    function UrlData(urlIn) {

        this.url = urlIn;
        var purl = this.url.split("://"),
            durl = purl[1].split("/");
        this.protocol = purl[0];
        this.domain = durl[0];
        this.urlTokens = durl;

    }

    function parseNums (text) {
        return text.match(/\d+/g);
    }

    UrlData.prototype = {
        parsePageNumber: function (pageIdentifier) {
            return parseNums(this.urlTokens[pageIdentifier]);
        },

        findSearchString: function (seriesIdString) {
            var page = parseNums(seriesIdString);
            var pagePos = seriesIdString.indexOf(page);
            var searchString = "";

            if (pagePos < seriesIdString.length/2) {
                searchString = seriesIdString.substring(pagePos + page.length, seriesIdString.length);
            } else {
                searchString = seriesIdString.substring(0, pagePos);
            }
            return searchString;
        }
    };

    return UrlData;
});
