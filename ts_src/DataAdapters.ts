/// <reference path="../Scripts/typings/es6-promise/es6-promise.d.ts"/>

import Dao = require("Dao");
import SaveData = require("SaveData");

export class LSAdapter implements IDataAdapter {

    loadData(): Promise<string> {

        var promise = new Promise<string>((resolve, reject) => {           
            try {
                var data = localStorage.getItem("seriesList");
                resolve(data);
            } catch (err) {
                console.error("could not complete loading of series data list");
                reject(err);
            }
       
        });
        return promise;
    }

    saveData(data: string): Promise<void> {    
           
        var promise = new Promise<void>((resolve, reject) => {
            try {
                localStorage.setItem("seriesList", data);
                resolve();
            } catch (err) {
                console.error("could not complete saving of series data list");
                reject(err);
            }
            
        });
        return promise;
    }
}

export class RemoteLSAdapter implements IDataAdapter {

    loadData(): Promise<string> {

        var promise = new Promise<string>((resolve, reject) => {
            try {
                chrome.runtime.sendMessage({ method: "loadSeriesList" }, seriesDataIn => {
                    resolve(seriesDataIn);
                });
            } catch (err) {
                console.error("could not complete remote loading of series data list");
                reject(err);
            }

        });
        return promise;
    }

    saveData(data: string): Promise<void> {

        var promise = new Promise<void>((resolve, reject) => {
            try {
                chrome.runtime.sendMessage({ method: "saveSeriesList", seriesList: data }, response => {
                    if (response) {resolve();}
                    else {reject(new Error("unable to save"));}
                });
            } catch (err) {
                console.error("could not complete remote saving of series data list");
                reject(err);
            }

        });
        return promise;
    }
}



export interface IDataAdapter {
    loadData: () => Promise<string>;
    saveData: (string) => Promise<void>;
}