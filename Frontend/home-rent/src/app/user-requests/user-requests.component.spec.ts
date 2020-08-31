import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestsComponent } from './user-requests.component';

describe('UserRequestsComponent', () => {
  let component: UserRequestsComponent;
  let fixture: ComponentFixture<UserRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
