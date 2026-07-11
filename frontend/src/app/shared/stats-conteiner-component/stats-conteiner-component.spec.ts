import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsConteinerComponent } from './stats-conteiner-component';

describe('StatsConteinerComponent', () => {
  let component: StatsConteinerComponent;
  let fixture: ComponentFixture<StatsConteinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsConteinerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsConteinerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
