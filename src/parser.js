define(
    "parser", [],

    function () {

        var generateVisualUrl = function (url) {

            var tokenizedURL = parseURL(url);

            var markup = tokenizedURL.protocol + "://";
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

            var purl = urlIn.split("://"),
                durl = purl[1].split("/");

            var retUrl = {
                protocol: purl[0],
                domain: durl[0]
            };

            retUrl.urlTokens = durl;

            return retUrl;
        };

        var parsePageNumber = function (/*seriesDef, url*/) {
            var seriesDef = arguments[0],
                url = arguments[1] ? arguments[1] : seriesDef.lastUrl;

            var purl = this.parseUrl(url);
            var pageId = purl.urlTokens[seriesDef.pageIdentifier];
            var pageNum = pageId.match(/\d+/g);
            return pageNum;
        }

        var splitSeriesSearchString = function (seriesId) {

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


        var public = {
            generateVisualUrl: generateVisualUrl,
            parseUrl: parseURL,
            splitSeriesSearchString: splitSeriesSearchString,
            parsePageNumber: parsePageNumber
        };
        return public;

    }
);
