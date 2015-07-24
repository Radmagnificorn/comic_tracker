/// <reference path="../Scripts/typings/es6-promise/es6-promise.d.ts"/>

import Series = require("Series");
import SaveData = require("SaveData");
import DataAdapters = require("DataAdapters");

class Dao {

    private dataSource: DataAdapters.IDataAdapter;

    constructor(dataSource: DataAdapters.IDataAdapter) {
        this.dataSource = dataSource;
    }

    saveSeriesDataList(seriesDataList: Series[]): Promise<void> {
        var saveDataList = seriesDataList.map(seriesData => seriesData.getSaveData());
        var saveDataString = JSON.stringify(saveDataList);

        var promise = new Promise<void>((resolve, reject) => {
            this.dataSource.saveData(saveDataString).then(
                () => resolve(),
                err => reject(err)
             );       
            
        });

        return promise;
    }

    loadSeriesDataList(): Promise<Series[]> {
        console.log("loading series data list");
        var promise = new Promise<Series[]>((resolve, reject) => {
            this.dataSource.loadData().then(seriesJsonData => {
                var sDataList = [];
                console.log(seriesJsonData);
                
                if (seriesJsonData != null) {
                    try {
                    var loadDataList = JSON.parse(seriesJsonData);
                        
                        sDataList = loadDataList.map(loadData => new Series(Dao.mapRawToSaveData(loadData)));
                        
                    } catch (err) {
                        console.error(err + "couldn't load series data");
                        reject(err);
                    }
                }

                resolve(sDataList);

            }, err => {
                console.error(err + "rejecting series load");
                reject(err);
            });
           
        });
        
        return promise;
    }

    static mapRawToSaveData(rawObject: any): SaveData {
        return new SaveData(
            rawObject.title,
            rawObject.lastUrl,
            rawObject.seriesIdentifier,
            rawObject.pageIdentifier
        );
    }


}

export = Dao;



