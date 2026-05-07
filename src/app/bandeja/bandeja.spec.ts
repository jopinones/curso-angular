import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bandeja } from './bandeja';

describe('Bandeja', () => {
  let component: Bandeja;
  let fixture: ComponentFixture<Bandeja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bandeja],
    }).compileComponents();

    fixture = TestBed.createComponent(Bandeja);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
