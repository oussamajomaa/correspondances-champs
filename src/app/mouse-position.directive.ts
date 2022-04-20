import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMousePosition]'
})
export class MousePositionDirective {

  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    console.log(event.clientX, event.clientY);
  }
  constructor() { }

}
