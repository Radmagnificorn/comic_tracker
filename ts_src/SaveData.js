define(["require", "exports"], function(require, exports) {
    var SaveData = (function () {
        function SaveData(title, lastUrl, seriesIdentifier, pageIdentifier) {
            this.title = title;
            this.lastUrl = lastUrl;
            this.seriesIdentifier = seriesIdentifier;
            this.pageIdentifier = pageIdentifier;
        }
        return SaveData;
    })();

    
    return SaveData;
});
