/// <reference path="../Scripts/typings/es6-promise/es6-promise.d.ts"/>
define(["require", "exports"], function(require, exports) {
    var LSAdapter = (function () {
        function LSAdapter() {
        }
        LSAdapter.prototype.loadData = function () {
            var promise = new Promise(function (resolve, reject) {
                try  {
                    var data = localStorage.getItem("seriesList");
                    resolve(data);
                } catch (err) {
                    console.error("could not complete loading of series data list");
                    reject(err);
                }
            });
            return promise;
        };

        LSAdapter.prototype.saveData = function (data) {
            var promise = new Promise(function (resolve, reject) {
                try  {
                    localStorage.setItem("seriesList", data);
                    resolve();
                } catch (err) {
                    console.error("could not complete saving of series data list");
                    reject(err);
                }
            });
            return promise;
        };
        return LSAdapter;
    })();
    exports.LSAdapter = LSAdapter;

    var RemoteLSAdapter = (function () {
        function RemoteLSAdapter() {
        }
        RemoteLSAdapter.prototype.loadData = function () {
            var promise = new Promise(function (resolve, reject) {
                try  {
                    chrome.runtime.sendMessage({ method: "loadSeriesList" }, function (seriesDataIn) {
                        resolve(seriesDataIn);
                    });
                } catch (err) {
                    console.error("could not complete remote loading of series data list");
                    reject(err);
                }
            });
            return promise;
        };

        RemoteLSAdapter.prototype.saveData = function (data) {
            var promise = new Promise(function (resolve, reject) {
                try  {
                    chrome.runtime.sendMessage({ method: "saveSeriesList", seriesList: data }, function (response) {
                        if (response) {
                            resolve();
                        } else {
                            reject(new Error("unable to save"));
                        }
                    });
                } catch (err) {
                    console.error("could not complete remote saving of series data list");
                    reject(err);
                }
            });
            return promise;
        };
        return RemoteLSAdapter;
    })();
    exports.RemoteLSAdapter = RemoteLSAdapter;
});
