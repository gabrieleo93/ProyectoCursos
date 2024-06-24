import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber)=>{
      console.log({email})

      if(email==='gabiistu@gmail.com'){
        subscriber.next({emailTaken:true});
        subscriber.complete();
      }
      subscriber.next(null);
      subscriber.complete();

    })

    return httpCallObservable

  }


}
