import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIncidentComponent } from './card-incident-component';

describe('CardIncidentComponent', () => {
  let component: CardIncidentComponent;
  let fixture: ComponentFixture<CardIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardIncidentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardIncidentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
