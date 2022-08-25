import {
  AfterContentInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subject, Subscription } from 'rxjs';
import { any, ITriggerPreset } from 'src/app/shared/models/trigger.model';
import { TriggerService } from 'src/app/shared/services/trigger.service';
import {
  IGroupSelectOption,
  ISelectOption,
} from 'src/app/shared/models/common.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'sip-trigger-common',
  templateUrl: './trigger-common.component.html',
  styleUrls: ['./trigger-common.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => TriggerCommonComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: TriggerCommonComponent,
      multi: true,
    },
  ],
})
export class TriggerCommonComponent
  implements ControlValueAccessor, Validators, AfterContentInit
{
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  public formGroup = new FormGroup({
    city: new FormControl(undefined, Validators.required),
    code: new FormControl(undefined, Validators.required),
    street: new FormControl(undefined, Validators.required),
  });

  public stateChanges = new Subject<void>();
  private _value: any;
  private touched = false;

  constructor() {}

  @Input()
  get value(): any | undefined {
    return this._value;
  }
  set value(value: any | undefined) {
    this._value = value;
    this.stateChanges.next();
    if (value) {
      this.markAsTouched();
    }
    this.onChange(this.value);
  }
  public onChange: any = () => {};
  public onTouch: any = () => {};

  ngAfterContentInit() {
    console.log(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  onBlur(): void {
    this.blur.emit();
  }
  onFocus(): void {
    this.focus.emit();
  }

  writeValue(input: any) {
    this.value = input;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

  validate(): ValidationErrors {
    for (let key in this.formGroup.controls) {
      if (!!this.formGroup.controls[key].errors) {
        return this.formGroup.controls[key].errors;
      }
    }
    return null;
  }
}
