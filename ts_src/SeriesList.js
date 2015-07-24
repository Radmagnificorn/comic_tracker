/// <reference path="../Scripts/typings/es6-promise/es6-promise.d.ts"/>
define(["require", "exports"], function(require, exports) {
    var SeriesList = (function () {
        function SeriesList(dao) {
            this.dao = dao;
            this.seriesList = new Array();
        }
        SeriesList.prototype.populateList = function () {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                _this.dao.loadSeriesDataList().then(function (list) {
                    _this.seriesList = list;
                    resolve();
                }, function (err) {
                    console.error(err + "unable to populate list");
                    reject(err);
                });
            });

            return promise;
        };

        SeriesList.prototype.save = function () {
            return this.dao.saveSeriesDataList(this.seriesList);
        };

        SeriesList.prototype.addSeries = function (series) {
            this.seriesList.push(series);
            this.save();
        };

        SeriesList.prototype.removeSeries = function (index) {
            this.seriesList.splice(index, 1);
            this.save();
        };

        SeriesList.prototype.generateUi = function () {
            var _this = this;
            var d = document;
            var element = d.createElement("ul");

            var delId = 0;

            this.seriesList.forEach(function (seriesData) {
                var pageNumber = seriesData.getFurthestRead();

                var li = d.createElement("li");
                var comicLink = d.createElement("a");
                var deleteLink = d.createElement("a");
                comicLink.href = seriesData.lastUrl.url;
                comicLink.target = "_blank";
                comicLink.textContent = seriesData.title + " (" + pageNumber + ") ";

                deleteLink.href = "#";
                deleteLink.textContent = "delete";
                deleteLink.addEventListener("click", (function (delId) {
                    return function () {
                        _this.removeSeries(delId);
                    };
                })(delId));
                deleteLink.classList.add("delButton");

                li.appendChild(comicLink);
                li.appendChild(deleteLink);

                element.appendChild(li);

                delId++;
            });

            return element;
        };
        return SeriesList;
    })();

    
    return SeriesList;
});
