import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'dynamicform-root',
    templateUrl: './dynamicform.component.html'
})
export class DynamicformComponent implements OnInit {
    @Output() formReady = new EventEmitter<FormGroup>()
    dynamicForm: FormGroup;
    @Input() public credential: FormGroup;



    constructor() {
    }

    ngOnInit() {
        this.dynamicForm = this.credential;
        console.log('llego el parametro', this.credential);
        this.formReady.emit(this.dynamicForm);
    }

    credentialKeys(): Array<string> {
        return Object.keys((this.dynamicForm as FormGroup).controls);
    }

    valueIsObject(item) {
        let itemValue = (this.credential.get(item) as FormGroup).controls;
        return typeof itemValue === 'object';
    }

    itemKeys(item) {
        return Object.keys((this.credential.get(item) as FormGroup).controls);
    }

}
