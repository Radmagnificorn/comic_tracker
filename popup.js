/**
 * Created by Stephen on 11/9/2014.
 */
var app;


    require(["parser"], function (urlParser) {

        app = (function () {

            var init = function () {

                // event handlers
                $("#addSeries").click(function () {
                    $("#step1").addClass("show");
                    var saveData = {};

                    $("#saveTitle").click(function () {
                        saveData.title = $("#seriesTitle").val();

                        chrome.tabs.getSelected(null, function(tab) {

                            $("#urlselector").html(urlParser.generateVisualUrl(tab.url));
                            saveData.lastUrl = tab.url;

                            $("#urlselector").on("click", ".urltoken", function (event) {
                                saveData.seriesIdentifier = $(this).data("index");

                                $("#pageselector").html(urlParser.generateVisualUrl(tab.url));
                                $("#step3").addClass("show");

                                $("#pageselector").on("click", ".urltoken", function (event) {
                                    saveData.pageIdentifier = $(this).data("index");


                                    $("#seriesList").html(seriesList.addSeries(saveData));
                                });
                            });

                            $("#step2").addClass("show");

                        });
                    });
                });



                $("#seriesList").on("click", ".delButton", function (event) {
                   var delId = $(event.target).data("delid");

                    $("#seriesList").html(seriesList.removeSeries(delId));
                });

                $("#seriesList").html(seriesList.generateUI());

            }

            var seriesList = (function() {

                var seriesDataList = localStorage.getItem("seriesList");

                if (!seriesDataList) {
                    seriesDataList = [];
                } else {
                    try {
                        seriesDataList = JSON.parse(seriesDataList);
                    } catch(e) {
                        seriesDataList = [];
                    }
                }

                function saveSeriesList() {
                    localStorage.setItem("seriesList", JSON.stringify(seriesDataList));
                }

                var generateUI = function () {
                    var markup = "<ul>";
                    var delId = 0;
                    seriesDataList.forEach(function (seriesData) {
                        var pageNumber = urlParser.parsePageNumber(seriesData);
                        markup += "<li><a href='" + seriesData.lastUrl + "'>" + seriesData.title + "(" + pageNumber + ")" + "</a>";
                        markup += "<a href='#' class='delButton' data-delId=' target='_blank'" + seriesDataList.indexOf(seriesData) + "'>x</a>" +"</li>";
                        delId++;
                    });

                    markup += "</ul>";

                    return markup;
                }

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
                }

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

