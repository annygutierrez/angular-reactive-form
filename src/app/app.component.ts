import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbbidenUsernames = ['Chris', 'Anna'];
  credentialForm: FormGroup;

  constructor(service: AppService) {
    this.credentialForm = service.getCredential({
      "@type": "AlastriaPartner",
      "@id": "did:ala:quor:testnet1:0x6df09cc1a3aae9aba17ac70ca2d628c7bf0bcead",
      "name": {
        "givenName": "",
        "familyName": ""
      },
      "company": {
        "name": "Alastria",
        "@id": "ala:quor:testnet1:0x4a2d5c4c4b6947f6ea67abb7d4c89813749e995a"
      },
      "memberOf": {
        "@id": "ala:quor:testnet1:0x4a2d5c4c4b6947f6ea67abb7d4c89813749e995a"
      },
      "issuer": "ala:quor:testnet1:0x4a2d5c4c4b6947f6ea67abb7d4c89813749e995a"
    });

  }


  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbbidenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
      'credential': this.credentialForm
    });
  }

  formInitialized(name: string, form: FormGroup) {
    console.log(form);
    this.signupForm.patchValue({
      [name]: form
    });
    console.log(this.signupForm);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  get credential() {
    return (this.signupForm.get('credential') as FormGroup);
  }

  valueIsObject(item) {
    let itemValue = (this.signupForm.get('credential.' + item) as FormGroup).controls;
    return typeof itemValue === 'object';
  }

  credentialKeys() : Array<string> {
    return Object.keys((this.signupForm.get('credential') as FormGroup).controls);
  }

  itemKeys(item) {
    return Object.keys((this.signupForm.get('credential.' + item) as FormGroup).controls);
  }

  onSubmit() {
    console.log(this.signupForm.getRawValue());
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbbidenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbbidenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbbiden': true}
    }
    return null;
  }
}
