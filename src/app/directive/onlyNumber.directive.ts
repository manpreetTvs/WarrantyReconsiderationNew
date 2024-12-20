import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]',
  standalone: true

})
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber!: any; // manpreet

  @HostListener('keydown', ['$event']) onKeyDown(event : any) { // manpreet
    let e = <KeyboardEvent>event;
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13, 110, 190, 188].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C          
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        //allow Comma
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }
  }
}

@Directive({
  selector: '[RestrictSpace]',
  standalone: true,
})
export class RestrictSpace {

  constructor(private el: ElementRef) { }

  @Input() restrictSpace!: boolean;

  // @HostListener('keypress', ['$event']) onKeyPress(event) {
  //   let e = <KeyboardEvent>event;
  //     if ((e.keyCode == 32)) {
  //       e.preventDefault();
  //     }
  //   }
  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent): void {  //manpreet
    let e: KeyboardEvent = event;
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  }
  }