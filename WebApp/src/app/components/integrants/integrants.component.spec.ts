import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrantsComponent } from './integrants.component';

describe('IntegrantsComponent', () => {
  let component: IntegrantsComponent;
  let fixture: ComponentFixture<IntegrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
