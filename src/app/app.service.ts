import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class AppService {

  getCredential(inputCredential) {
    let credential = {};
    let credentialKeys = Object.keys(inputCredential);
    credentialKeys.forEach(itemCredential => {
      if(typeof inputCredential[itemCredential] === 'string') {
        credential[itemCredential] = new FormControl({
          value: inputCredential[itemCredential],
          disabled: inputCredential[itemCredential] !== ''
        }, Validators.required);
      } else if (typeof inputCredential[itemCredential] === 'object') {
        credential[itemCredential] = this.getCredential(inputCredential[itemCredential]);
      }
    })
    return new FormGroup(credential);
  }
}


