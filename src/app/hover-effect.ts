import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
  standalone: true
})
export class HoverEffectDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.3s ease');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 10px 25px rgba(27, 67, 83, 0.2)');
    
    const img = this.el.nativeElement.querySelector('.product-image');
    if (img) {
      this.renderer.setStyle(img, 'transform', 'scale(1.05)');
      this.renderer.setStyle(img, 'transition', 'transform 0.3s ease');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
    
    
    const img = this.el.nativeElement.querySelector('.product-image');
    if (img) {
      this.renderer.setStyle(img, 'transform', 'scale(1)');
    }
  }
}