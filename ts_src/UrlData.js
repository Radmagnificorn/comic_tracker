define(["require", "exports"], function(require, exports) {
    var UrlData = (function () {
        function UrlData(url) {
            this.url = url;

            var purl = this.url.split("://");
            var durl = purl[1].split("/");

            this.protocol = purl[0];
            this.domain = durl[0];
            this.urlTokens = durl;
        }
        UrlData.parseNums = function (text) {
            var results = text.match(/\d+/g);
            var nums = [];
            if (results != null && results.length > 0) {
                nums = results.map(function (n) {
                    return parseInt(n);
                });
            }
            return nums;
        };

        UrlData.prototype.parsePageNumber = function (pageIdentifier) {
            var pNums = UrlData.parseNums(this.urlTokens[pageIdentifier]);
            var pageNum = (pNums.length > 0) ? pNums[0] : -1;

            return pageNum;
        };

        UrlData.findSearchString = function (seriesPattern) {
            var page = UrlData.parseNums(seriesPattern);
            var pagePos = seriesPattern.indexOf(page[0].toString());
            var searchString = "";

            if (pagePos < seriesPattern.length / 2) {
                searchString = seriesPattern.substring(pagePos + page.length, seriesPattern.length);
            } else {
                searchString = seriesPattern.substring(0, pagePos);
            }
            return searchString;
        };

        UrlData.prototype.toString = function () {
            return this.url;
        };
        return UrlData;
    })();

    
    return UrlData;
});
