define('dao', ['series_data'], function (SeriesData) {

    var Dao = {
        saveSeriesDataList: function (seriesDataList) {
            var saveDataList = seriesDataList.map(function (seriesData) {
                return seriesData.getSaveData();
            });
            var saveDataString = JSON.stringify(saveDataList);
            localStorage.setItem("seriesList", saveDataString);
        },
        loadSeriesDataList: function () {
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
    };

    return Dao

});