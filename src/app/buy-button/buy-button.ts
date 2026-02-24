import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [style.backgroundColor]="color" 
      class="dynamic-btn"
      (click)="onClick()">
      {{ title }}
    </button>
  `,
  styles: [`
    .dynamic-btn {
      color: #ffffff;
      border: none;
      padding: 12px;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: opacity 0.3s ease;
    }
    .dynamic-btn:hover {
      opacity: 0.85; /* Slight fade effect on hover */
    }
  `]
})
export class BuyButtonComponent {
  @Input() title: string = 'Add to Cart'; 
  @Input() color: string = '#1b4353';

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}