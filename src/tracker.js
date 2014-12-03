/**
 * Created by Stephen on 11/10/2014.
 */

require(['parser', 'series_data', 'url_data'], function (urlParser, SeriesData, UrlData) {
    chrome.runtime.sendMessage({method: 'getUrls'}, function(seriesDataIn) {
        var seriesDataList = seriesDataIn.map(function (seriesData) {
            return new SeriesData(seriesData);
        });
        var currentUrl = new UrlData(window.location.href);
        var seriesData = findSeriesMatch(seriesDataList, currentUrl);

        if (seriesData) {
            showHelperUI(seriesData.title, currentUrl.parsePageNumber(seriesData.pageIdentifier));
            seriesData.lastUrl = currentUrl;
            saveSeries(seriesData);
        }
    });

    function findSeriesMatch(seriesList, pageUrl) {

        var match = null;

        seriesList.forEach(function (series) {

            var sToken = urlParser.parseUrl(series.lastUrl);
            var seriesSearch = series.seriesSearchString;
            var cSeriesId = pageUrl.urlTokens[series.seriesIdentifier];
            if (sToken.domain == pageUrl.domain) {

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
