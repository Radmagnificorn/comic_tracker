/**
 * Created by Stephen on 11/10/2014.
 */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    var seriesList = JSON.parse(localStorage["seriesList"]);

    if (request.method == "getUrls") {
        sendResponse(seriesList);
    } else if (request.method == "saveSeries") {
        var updated = updateLastUrl(seriesList, request.series);
        if (updated) {
            localStorage.setItem("seriesList", JSON.stringify(seriesList));
        }
        sendResponse(updated);
    }
});

function updateLastUrl(seriesList, series) {
    var updated = false;
    seriesList.forEach(function (iSeries) {
        if (iSeries.title == series.title) {
            iSeries.lastUrl = series.lastUrl;
            updated = true;
        }
    });

    return updated;
}
