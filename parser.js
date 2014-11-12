define(
    "parser", [],

    function () {

        var SelectionMode = "none";


        var generateVisualUrl = function (url) {
            var tokenizedURL = parseURL(url);

            var markup = tokenizedURL.protocol + "://"; //<div class='domainId urltoken'>" + tokenizedURL.domain + "</div> / ";
            var index = 0;
            tokenizedURL.urlTokens.forEach(function(token) {
                markup += "<div data-index='" + index + "' class='urltoken";
                if(/\d/.test(token)) { markup += " numeric"; }
                markup += "'>" + token + "</div> / ";
                index++;
            });


            return markup;
        }

        var parseURL = function(urlIn) {

            var purl = urlIn.split("://");
            var durl = purl[1].split("/");
            var retUrl = {
                protocol: purl[0],
                domain: durl[0]
            };
            //durl.shift(); //drop domain from durl
            retUrl.urlTokens = durl;

            return retUrl;
        };

        var parsePageNumber = function (/*seriesDef, url*/) {
            var seriesDef = arguments[0];
            var url = arguments[1] ? arguments[1] : seriesDef.lastUrl;

            var purl = this.parseUrl(url);
            var pageId = purl.urlTokens[seriesDef.pageIdentifier];
            var pageNum = pageId.match(/\d+/g);
            return pageNum;
        }

        var splitSeriesSearchString = function (seriesId) {
            alert("making it into findSeriesSearchString");

            var page = seriesId.match(/(\d+)/g) + "";
            var pagePos = seriesId.indexOf(page);
            var subId = "";
            if (pagePos < seriesId.length/2) {
                subId = seriesId.substring(pagePos + page.length, seriesId.length);
            } else {
                subId = seriesId.substring(0, pagePos);
            }

            return subId
        }

        function findDomain(url) {
            return url.match(/http:\/\/(.*?)\//g);
        }

        function findPageMatches(url) {
            var tokens = url.split("/");
            var matches = tokens.pop().match(/(\d+)/g);
            return matches;
        }

        var public = {
            generateVisualUrl: generateVisualUrl,
            parseUrl: parseURL,
            splitSeriesSearchString: splitSeriesSearchString,
            parsePageNumber: parsePageNumber
        };
        return public;

    }
);
