/**
 * Created by Stephen on 11/10/2014.
 */



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    var seriesList = localStorage["seriesList"];

    if (request.method === "loadSeriesList") {
        sendResponse(seriesList);
    } else if (request.method === "saveSeriesList") {
        
       localStorage.setItem("seriesList", request.seriesList);
     
       sendResponse(true);
    }
});

function updateLastUrl(seriesList, series) {
    var updated = false;
    seriesList.forEach(function (iSeries) {
        if (iSeries.title === series.title) {
            iSeries.lastUrl = series.lastUrl;
            updated = true;
        }
    });

    return updated;
}
