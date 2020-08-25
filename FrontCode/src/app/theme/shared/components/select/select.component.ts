import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { BlogServiceProxy, DicKeyAndName } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true,
  }]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() title;
  @Input() defaultValue;
  selectedDic = new FormControl('');
  dicKeyAndNames: Array<DicKeyAndName>;
  onTouched: any = () => { };

  constructor(private blogServiceProxy: BlogServiceProxy) { }

  ngOnInit() {
    this.refresh();
  }

  writeValue(obj: any): void {
    if (this.selectedDic) {
      this.selectedDic.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.selectedDic.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.selectedDic.disable();
    } else {
      this.selectedDic.enable();
    }
  }

  refresh(): void {
    this.blogServiceProxy.getBlogTyps().subscribe(res => {
      this.dicKeyAndNames = res;
    });
  }
}
