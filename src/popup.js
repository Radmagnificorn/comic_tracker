/**
 * Created by Stephen on 11/9/2014.
 */
var app;


require(['dao', 'series_data', 'url_data'], function (Dao, urlParser, SeriesData, UrlData) {

    app = (function () {

        var init = function () {

            // event handlers

            var saveData = {};

            $("#saveTitle").click(function () {

                saveData.title = $("#seriesTitle").val();

                chrome.tabs.getSelected(null, function(tab) {

                    //$("#urlselector").html(urlParser.generateVisualUrl(tab.url));
                    $("#urlselector").html("Hey");

                    saveData.lastUrl = tab.url;

                    $("#urlselector").on("click", ".urltoken", function () {
                        saveData.seriesIdentifier = $(this).data("index");

                        $("#pageselector").html(urlParser.generateVisualUrl(tab.url));
                        $("#step3").addClass("show");

                        $("#pageselector").on("click", ".urltoken", function () {
                            saveData.pageIdentifier = $(this).data("index");

                            $("#seriesList").html(seriesList.addSeries(new SeriesData(saveData)));
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

            var seriesDataList = Dao.loadSeriesDataList();


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

                seriesDataList.push(saveData);
                Dao.saveSeriesDataList(seriesDataList);
                return generateUI();
            };

            var removeSeries = function(index) {
                seriesDataList.splice(index, 1);
                saveSeriesList();
                return generateUI();
            };


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

