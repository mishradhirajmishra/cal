import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvilablityComponent } from './avilablity.component';

describe('AvilablityComponent', () => {
  let component: AvilablityComponent;
  let fixture: ComponentFixture<AvilablityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvilablityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvilablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
