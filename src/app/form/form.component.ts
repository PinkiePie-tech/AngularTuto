import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'sip-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
})
export class FormComponent {
  public formGroup = new FormGroup(
    {
      firstname: new FormControl(undefined, Validators.required),
      name: new FormControl(undefined, Validators.required),
      adress: new FormGroup(
        {
          city: new FormControl(undefined, Validators.required),
          code: new FormControl(undefined, Validators.required),
          street: new FormControl(undefined, Validators.required),
        },
        this.GroupValidators
      ),
      phone: new FormGroup(
        {
          prefix: new FormControl(undefined, [
            Validators.maxLength(4),
            Validators.required,
          ]),
          number: new FormControl(undefined, [
            Validators.maxLength(10),
            Validators.required,
          ]),
        },
        this.GroupValidators
      ),
      lead: new FormControl(undefined, [
        this.LeadValidators,
        Validators.required,
      ]),
    },
    this.GroupValidators
  );

  private LeadValidators(control: AbstractControl): ValidationErrors {
    if (control?.value?.toLowerCase().search('jean')) {
      return {
        wrongLead: "Non c'est pas lui, roooh il y en a pas 40",
      };
    }
    return null;
  }

  private GroupValidators(group: FormGroup): ValidationErrors {
    for (let key in group.controls) {
      if (!!group.controls[key].errors) {
        return group.controls[key].errors;
      }
    }
    return null;
  }
}
