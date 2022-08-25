import {
  AfterContentInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
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
import {
  distinctUntilChanged,
  Subject,
  Subscription,
  debounceTime,
  tap,
} from 'rxjs';

@Component({
  selector: 'sip-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => AdressComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: AdressComponent,
      multi: true,
    },
  ],
})
export class AdressComponent
  implements ControlValueAccessor, Validators, AfterContentInit, OnDestroy
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
  private subscription = new Subscription();

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
    this.formGroup.setValue({
      ...this.formGroup.getRawValue(),
      ...this.value,
    });

    this.subscription.add(
      this.formGroup.valueChanges.subscribe((value) => (this.value = value))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
