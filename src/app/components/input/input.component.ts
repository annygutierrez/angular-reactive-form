import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-root',
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() label: string;

  constructor() {
      console.log(this.label)
  }
}
