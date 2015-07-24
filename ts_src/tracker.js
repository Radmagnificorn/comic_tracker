// <reference path="../Scripts/typings/requirejs/require.d.ts"/>
define(["require", "exports", "UrlData", "Dao", "DataAdapters"], function(require, exports, UrlData, Dao, DataAdapters) {
    var dao = new Dao(new DataAdapters.RemoteLSAdapter());

    dao.loadSeriesDataList().then(function (seriesList) {
        var currentUrl = new UrlData(window.location.href);
        var seriesData = findSeriesMatch(seriesList, currentUrl);

        if (seriesData != null) {
            showHelperUI(seriesData.title, currentUrl.parsePageNumber(seriesData.pageIdentifier));
            seriesData.lastUrl = currentUrl;
            dao.saveSeriesDataList(seriesList);
        }
    });

    function findSeriesMatch(seriesList, pageUrl) {
        var match = null;

        seriesList.forEach(function (series) {
            var sToken = series.lastUrl;
            var seriesSearch = series.getSearchString();
            var cSeriesId = pageUrl.urlTokens[series.seriesIdentifier];

            if (sToken.domain === pageUrl.domain) {
                if (cSeriesId.indexOf(seriesSearch) > -1) {
                    match = series;
                }
            }
        });

        return match;
    }

    function showHelperUI(name, page) {
        alert("showing helper");
        var markup = "<div id='helperWrapper'>";
        markup += "<div>" + name + "</div><div>pg: " + page + "</div>";
        markup += "<div id='saveStatus'></div>";
        markup += "</div>";
        $("body").prepend(markup);
    }
});
