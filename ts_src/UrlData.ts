
class UrlData {

    url: string;
    domain: string;
    urlTokens: string[];
    protocol: string;

    constructor(url: string) {
        this.url = url;

        var purl = this.url.split("://");
        var durl = purl[1].split("/");

        this.protocol = purl[0];
        this.domain = durl[0];
        this.urlTokens = durl;
    }

    static parseNums(text: string): number[] {
        var results = text.match(/\d+/g);
        var nums = []; // default to no matches
        if (results != null && results.length > 0) {
            nums = results.map((n) => parseInt(n));
        }
        return nums;
    }


    parsePageNumber(pageIdentifier: number): number {
        var pNums = UrlData.parseNums(this.urlTokens[pageIdentifier]);
        var pageNum = (pNums.length > 0) ? pNums[0] : -1;

        return pageNum;
    }

    static findSearchString(seriesPattern: string): string {

        var page = UrlData.parseNums(seriesPattern);
        var pagePos = seriesPattern.indexOf(page[0].toString());
        var searchString = "";

        if (pagePos < seriesPattern.length / 2) {
            searchString = seriesPattern.substring(pagePos + page.length, seriesPattern.length);
        } else {
            searchString = seriesPattern.substring(0, pagePos);
        }
        return searchString;
    }

    toString() {
        return this.url;
    }
}

export = UrlData;
