import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[click.stop]'
})
export class StopPropagationDirective implements OnInit, OnDestroy{

  @Output('click.stop') stopPropEvent = new EventEmitter();
  unsubscribe;

  constructor(private renderer: Renderer2, private element: ElementRef) {
  }

  ngOnInit() {
    this.unsubscribe = this.renderer.listen(this.element.nativeElement, 'click', event => {
      event.stopPropagation();
      this.stopPropEvent.emit(event);
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
