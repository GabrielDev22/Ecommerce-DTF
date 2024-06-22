import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appAppHasPermited]',
  providers: [{provide: NG_VALIDATORS, useExisting: AppHasPermitedDirective, multi: true}],
  standalone: true
})
export class AppHasPermitedDirective implements Validator {

  @Input('appAppHasPermited') regexPattern?: string;

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    if(!this.regexPattern){
      return null;
    }
    const regex = new RegExp(this.regexPattern);
    const valid = regex.test(control.value);
    return valid ? null : {regexInvalid: true};
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
