import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhomesComponent } from './myhomes.component';

describe('MyhomesComponent', () => {
  let component: MyhomesComponent;
  let fixture: ComponentFixture<MyhomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
