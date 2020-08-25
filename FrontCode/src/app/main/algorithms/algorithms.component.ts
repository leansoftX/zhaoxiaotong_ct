import { Component, OnInit } from '@angular/core';
import { AlgorithmsServiceProxy, QuickSortData } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss']
})
export class AlgorithmsComponent implements OnInit {
  interval;
  index: number = 0;
  beginDatas: number[] = [66, 78, 90, 22, 64, 18, 86, 32, 19, 60, 28, 24, 23, 17, 67, 82, 57, 89, 33, 11, 76, 43, 79, 5, 42, 99, 14, 95, 68, 51, 4, 77, 91, 83, 27, 21, 84, 72, 8, 30, 71, 52, 20, 94, 80, 29, 81, 26, 39, 53];
  datas: Array<QuickSortData> = [];
  constructor(private algorithmsServiceProxy: AlgorithmsServiceProxy) { }
  ngOnInit() {
    this.beginDatas.forEach(data => {
      let quickSortData = { change : false, value : data} as QuickSortData;
      this.datas.push(quickSortData);
    });
  }

  async excecuteAlgorithm() {
    let result = await this.algorithmsServiceProxy.quickSort(this.beginDatas).toPromise();
    let that = this;
    this.interval = setInterval(function () {
      if (that.index < result.length) {
        that.datas = result[that.index++]
      } else {
        clearInterval(that.interval);
      }
    }, 300);
  }

  resetAlgorithm() {
    this.index = 0;
    this.datas = [];
    this.beginDatas.forEach(data => {
      let quickSortData = { change : false, value : data} as QuickSortData;
      this.datas.push(quickSortData);
    });
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
