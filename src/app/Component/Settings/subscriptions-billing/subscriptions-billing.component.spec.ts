import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsBillingComponent } from './subscriptions-billing.component';

describe('SubscriptionsBillingComponent', () => {
  let component: SubscriptionsBillingComponent;
  let fixture: ComponentFixture<SubscriptionsBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
