import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
  standalone: true
})
export class HoverEffectDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Add a smooth transition to the card itself when it loads
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.3s ease');
  }

  // When the mouse enters the card
  @HostListener('mouseenter') onMouseEnter() {
    // 1. Add the box shadow to the card
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 10px 25px rgba(27, 67, 83, 0.2)');
    
    // 2. Find the image inside the card and zoom it
    const img = this.el.nativeElement.querySelector('.product-image');
    if (img) {
      this.renderer.setStyle(img, 'transform', 'scale(1.05)');
      this.renderer.setStyle(img, 'transition', 'transform 0.3s ease');
    }
  }

  // When the mouse leaves the card
  @HostListener('mouseleave') onMouseLeave() {
    // 1. Remove the box shadow
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
    
    // 2. Reset the image zoom back to normal
    const img = this.el.nativeElement.querySelector('.product-image');
    if (img) {
      this.renderer.setStyle(img, 'transform', 'scale(1)');
    }
  }
}