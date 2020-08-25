export class TblLeft {
    id: number;
    reposname: string;
    reposid: string;
    language: string;
    description: string;
    checked: boolean = false;
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

export class TblRight {
    id: number;
    tblleftid: number;
    reposname: string;
    reposid: string;
    language: string;
    description: string;
    checked: boolean = false;
    cloneUrl: string;

    constructor(tblleftid, reposname, reposid, language, description, cloneUrl) {
        this.reposname = reposname;
        this.tblleftid = tblleftid;
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
