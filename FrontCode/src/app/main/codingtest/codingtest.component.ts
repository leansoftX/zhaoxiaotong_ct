import { Component, OnInit } from '@angular/core';
import { TblLeft, TblRight, GenerateData } from './models/codingtestData';
import { CodingTestServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

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


  constructor(private codingTestServiceProxy: CodingTestServiceProxy) {

  }

  ngOnInit() {
    this.initDatas()
  }

  initDatas() {
    this.codingTestServiceProxy.getTblLeftInfos().subscribe(res => {
      res.forEach(data => {
        let tblLeft = new TblLeft(data.id, data.tblReposDetailId, data.reposName, data.reposId, data.language, data.description, data.cloneUrl);
        this.tblLeftDatas.push(tblLeft);
      });
    });

    this.codingTestServiceProxy.getTblRightInfos().subscribe(res => {
      res.forEach(data => {
        let tblRight = new TblRight(data.id, data.tblReposDetailId, data.reposName, data.reposId, data.language, data.description, data.cloneUrl);
        this.tblRightDatas.push(tblRight);
        this.generateEmail();
      });
    });

  }

  selectAll(datas, leftOrRight) {
    leftOrRight = !leftOrRight
    datas.forEach(data => {
      data.checked = leftOrRight;
    });
  }

  pullRight() {
    let datachecked = this.tblLeftDatas.filter(leftData => leftData.checked === true);
    datachecked.forEach(data => {
      if (this.tblRightDatas.filter(rightData => rightData.tblreposdetailId === data.tblreposdetailId).length === 0) {
        let tblRightData = new TblRight(data.id, data.tblreposdetailId, data.reposname, data.reposid, data.language, data.description, data.cloneUrl);
        this.tblRightDatas.push(tblRightData);
        this.codingTestServiceProxy.pullRight(tblRightData.tblreposdetailId).subscribe(res => {
          console.log("pullRight success");
        });
      }
    });
    this.tblLeftDatas = this.tblLeftDatas.filter(leftData => leftData.checked === false);
    this.checkedLeft = false;
  }

  pullLeft() {
    let datachecked = this.tblRightDatas.filter(rightData => rightData.checked === true);
    datachecked.forEach(data => {
      if (this.tblLeftDatas.filter(leftData => leftData.tblreposdetailId === data.tblreposdetailId).length === 0) {
        let tblLeftData = new TblLeft(data.id, data.tblreposdetailId, data.reposname, data.reposid, data.language, data.description, data.cloneUrl);
        this.tblLeftDatas.push(tblLeftData);
        this.codingTestServiceProxy.pullLeft(tblLeftData.tblreposdetailId).subscribe(res => {
          console.log("pullLeft success");
        });
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
