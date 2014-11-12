/**
 * Created by Stephen on 11/10/2014.
 */

require(["parser"], function (urlParser) {
    chrome.runtime.sendMessage({method: "getUrls"}, function(seriesDataList) {
        var currentUrl = window.location.href;
        var seriesData = findSeriesMatch(seriesDataList, currentUrl);

        if (seriesData) {
            showHelperUI(seriesData.title, urlParser.parsePageNumber(seriesData, currentUrl));
            seriesData.lastUrl = currentUrl;
            saveSeries(seriesData);
        }
    });

    function findSeriesMatch(seriesList, pageUrl) {

        var curlToken = urlParser.parseUrl(pageUrl);
        var match;

        seriesList.forEach(function (series) {

            var sToken = urlParser.parseUrl(series.lastUrl);
            var seriesSearch = series.seriesSearchString;
            var cSeriesId = curlToken.urlTokens[series.seriesIdentifier];
            if (sToken.domain == curlToken.domain) {

                if (cSeriesId.indexOf(seriesSearch) > -1) {
                    match = series;
                }
            }
        });

        return match;
    }

    function saveSeries(seriesData) {
        chrome.runtime.sendMessage({method: "saveSeries", series: seriesData}, function (response) {
            $("#saveStatus").text(response ? "Page Saved" : "Save Failed");
        });
    }

    function showHelperUI(name, page) {
        var markup = "<div id='helperWrapper'>";
        markup += "<div>" + name + "</div><div>pg: " + page + "</div>";
        markup += "<div id='saveStatus'></div>";
        markup += "</div>";
        $("body").prepend(markup);

    }
});
