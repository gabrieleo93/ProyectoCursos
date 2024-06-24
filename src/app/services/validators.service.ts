import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  isValidField(form: FormGroup, field: string): boolean | null {
    const control = form.get(field);
    if (!control) return null;
    return control.errors && control.touched ? true : null;
  }

  isPassOneEqualsPassTwo(pass1: string, pass2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (!pass1Control || !pass2Control) {
        return null;
      }

      const passValue1 = pass1Control.value;
      const passValue2 = pass2Control.value;

      if (passValue1 !== passValue2) {
        pass2Control.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      pass2Control.setErrors(null);
      return null;
    };
  }

}
