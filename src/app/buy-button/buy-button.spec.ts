import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyButton } from './buy-button';

describe('BuyButton', () => {
  let component: BuyButton;
  let fixture: ComponentFixture<BuyButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
