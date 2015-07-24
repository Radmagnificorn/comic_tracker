/// <reference path="../Scripts/typings/es6-promise/es6-promise.d.ts"/>
define(["require", "exports", "Series", "SaveData"], function(require, exports, Series, SaveData) {
    var Dao = (function () {
        function Dao(dataSource) {
            this.dataSource = dataSource;
        }
        Dao.prototype.saveSeriesDataList = function (seriesDataList) {
            var _this = this;
            var saveDataList = seriesDataList.map(function (seriesData) {
                return seriesData.getSaveData();
            });
            var saveDataString = JSON.stringify(saveDataList);

            var promise = new Promise(function (resolve, reject) {
                _this.dataSource.saveData(saveDataString).then(function () {
                    return resolve();
                }, function (err) {
                    return reject(err);
                });
            });

            return promise;
        };

        Dao.prototype.loadSeriesDataList = function () {
            var _this = this;
            console.log("loading series data list");
            var promise = new Promise(function (resolve, reject) {
                _this.dataSource.loadData().then(function (seriesJsonData) {
                    var sDataList = [];
                    console.log(seriesJsonData);

                    if (seriesJsonData != null) {
                        try  {
                            var loadDataList = JSON.parse(seriesJsonData);

                            sDataList = loadDataList.map(function (loadData) {
                                return new Series(Dao.mapRawToSaveData(loadData));
                            });
                        } catch (err) {
                            console.error(err + "couldn't load series data");
                            reject(err);
                        }
                    }

                    resolve(sDataList);
                }, function (err) {
                    console.error(err + "rejecting series load");
                    reject(err);
                });
            });

            return promise;
        };

        Dao.mapRawToSaveData = function (rawObject) {
            return new SaveData(rawObject.title, rawObject.lastUrl, rawObject.seriesIdentifier, rawObject.pageIdentifier);
        };
        return Dao;
    })();

    
    return Dao;
});
