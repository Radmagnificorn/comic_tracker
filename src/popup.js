/**
 * Created by Stephen on 11/9/2014.
 */
var app;


    require(["parser", 'series_data', 'url_data'], function (urlParser, SeriesData, UrlData) {

        app = (function () {

            var init = function () {

                // event handlers

                var saveData = {};

                $("#saveTitle").click(function () {
                    saveData.title = $("#seriesTitle").val();

                    chrome.tabs.getSelected(null, function(tab) {

                        $("#urlselector").html(urlParser.generateVisualUrl(tab.url));
                        saveData.lastUrl = tab.url;

                        $("#urlselector").on("click", ".urltoken", function () {
                            saveData.seriesIdentifier = $(this).data("index");

                            $("#pageselector").html(urlParser.generateVisualUrl(tab.url));
                            $("#step3").addClass("show");

                            $("#pageselector").on("click", ".urltoken", function () {
                                saveData.pageIdentifier = $(this).data("index");

                                $("#seriesList").html(seriesList.addSeries(saveData));
                            });
                        });

                        $("#step2").addClass("show");

                    });
                });




                $("#seriesList").on("click", ".delButton", function (event) {
                   var delId = $(event.target).data("delid");

                    $("#seriesList").html(seriesList.removeSeries(delId));
                });

                $("#seriesList").html(seriesList.generateUI());

            };

            var seriesList = (function() {

                var seriesDataList = loadSeriesDataList();

                function loadSeriesDataList() {
                    var seriesRawData = localStorage.getItem("seriesList");
                    sDataList = [];
                    if (seriesRawData) {
                        try {
                            var loadDataList = JSON.parse(seriesRawData);
                            var sDataList = loadDataList.map(function (loadData) {
                                return new SeriesData(loadData);
                            });
                        } catch(e) {
                            alert(e);
                        }
                    }

                    return sDataList;
                }

                function saveSeriesList() {
                    localStorage.setItem("seriesList", JSON.stringify(seriesDataList));
                }

                var generateUI = function () {
                    var markup = "<ul>";
                    var delId = 0;
                    seriesDataList.forEach(function (seriesData) {
                        var pageNumber = seriesData.getFurthestRead();
                        markup += "<li><a href='" + seriesData.lastUrl + "' target='_blank'>" + seriesData.title + "(" + pageNumber + ")" + "</a>";
                        markup += "<a href='#' class='delButton' data-delId='" + seriesDataList.indexOf(seriesData) + "'>delete</a>" + "</li>";
                        delId++;
                    });

                    markup += "</ul>";

                    return markup;
                };

                var addSeries = function (saveData) {

                    saveData = formatSaveData(saveData);

                    seriesDataList.push(saveData);
                    saveSeriesList();
                    return generateUI();
                };

                var removeSeries = function(index) {
                    seriesDataList.splice(index, 1);
                    saveSeriesList();
                    return generateUI();
                };

                function formatSaveData(saveData) {

                    var tUrl = urlParser.parseUrl(saveData.lastUrl);
                    var seriesString = tUrl.urlTokens[saveData.seriesIdentifier];

                    if (saveData.seriesIdentifier === saveData.pageIdentifier) {
                        saveData.seriesSearchString = urlParser.splitSeriesSearchString(seriesString);
                    } else {
                        saveData.seriesSearchString = seriesString;
                    }
                    return saveData;
                }



                var public = {
                    list: seriesDataList,
                    generateUI: generateUI,
                    addSeries: addSeries,
                    removeSeries: removeSeries

                };
                return public;
            })();

            var public = {
                init: init
            };
            return public;
        })();

        app.init();


});

