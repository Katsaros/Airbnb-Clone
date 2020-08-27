import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeComponent } from './new-home.component';

describe('NewHomeComponent', () => {
  let component: NewHomeComponent;
  let fixture: ComponentFixture<NewHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
