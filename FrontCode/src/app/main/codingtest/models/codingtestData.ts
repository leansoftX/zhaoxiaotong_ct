export class TblLeft {
    id: number;
    tblreposdetailId: number;
    reposname: string;
    reposid: string;
    language: string;
    description: string;
    checked: boolean = false;
    cloneUrl: string;

    constructor(id, tblreposdetailId, reposname, reposid, language, description, cloneUrl) {
        this.id = id;
        this.tblreposdetailId = tblreposdetailId;
        this.reposname = reposname;
        this.reposid = reposid;
        this.language = language;
        this.description = description;
        this.cloneUrl = cloneUrl;
    }
}

export class TblRight {
    id: number;
    tblreposdetailId: number;
    reposname: string;
    reposid: string;
    language: string;
    description: string;
    checked: boolean = false;
    cloneUrl: string;

    constructor(id, tblreposdetailId, reposname, reposid, language, description, cloneUrl) {
        this.id = id;
        this.tblreposdetailId = tblreposdetailId;
        this.reposname = reposname;
        this.reposid = reposid;
        this.language = language;
        this.description = description;
        this.cloneUrl = cloneUrl;
    }
}

export class GenerateData {
    id: number;
    reposname: string;
    reposid: string;
    language: string;
    description: string;
    cloneUrl: string;

    constructor(id, reposname, reposid, language, description, cloneUrl) {
        this.id = id;
        this.reposname = reposname;
        this.reposid = reposid;
        this.language = language;
        this.description = description;
        this.cloneUrl = cloneUrl;
    }
}
