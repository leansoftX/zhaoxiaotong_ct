import { Component, OnInit } from '@angular/core';
import { TblLeft, TblRight, GenerateData } from './models/codingtestData';

@Component({
  selector: 'app-codingtest',
  templateUrl: './codingtest.component.html',
  styleUrls: ['./codingtest.component.scss']
})
export class CodingtestComponent implements OnInit {
  public tblLeftDatas: Array<TblLeft> = [];
  public tblRightDatas: Array<TblRight> = [];
  public generateDatas: Array<GenerateData> = [];
  public checkedLeft: boolean = false;
  public checkedRight: boolean = false;

  constructor() { }

  ngOnInit() {
    this.initDatas()
  }

  initDatas() {
    this.tblLeftDatas = [
      new TblLeft(1, 'reposname1', '1', 'C#', 'repos description 1', "repos url 1"),
      new TblLeft(2, 'reposname2', '2', 'Java', 'repos description 2', "repos url 1"),
      new TblLeft(3, 'reposname3', '3', 'C++', 'repos description 3', "repos url 1")
    ];
  }

  selectAll(datas, leftOrRight) {
    leftOrRight = !leftOrRight
    datas.forEach(data => {
      data.checked = leftOrRight;
    });
  }

  pushRight() {
    let datachecked = this.tblLeftDatas.filter(leftData => leftData.checked === true);
    datachecked.forEach(data => {
      if (this.tblRightDatas.filter(rightData => rightData.tblleftid === data.id).length === 0) {
        let tblRightData = new TblRight(data.id, data.reposname, data.reposid, data.language, data.description, data.cloneUrl);
        this.tblRightDatas.push(tblRightData);
      }
    });
    this.tblLeftDatas = this.tblLeftDatas.filter(leftData => leftData.checked === false);
    this.checkedLeft = false;
  }

  pushLeft() {
    let datachecked = this.tblRightDatas.filter(rightData => rightData.checked === true);
    datachecked.forEach(data => {
      if (this.tblLeftDatas.filter(leftData => leftData.id === data.tblleftid).length === 0) {
        let tblLeftData = new TblLeft(data.tblleftid, data.reposname, data.reposid, data.language, data.description, data.cloneUrl);
        this.tblLeftDatas.push(tblLeftData);
      }
    });
    this.tblRightDatas = this.tblRightDatas.filter(rightData => rightData.checked === false);
    this.generateEmail();
    this.checkedRight = false;
  }

  generateEmail() {
    this.generateDatas = [];
    this.tblRightDatas.forEach(rightData => {
      let generateData = new GenerateData(rightData.id, rightData.reposname, rightData.reposid, rightData.language, rightData.description, rightData.cloneUrl);
      this.generateDatas.push(generateData);
    });
  }

}
