import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarrComponent } from './nav-barr.component';

describe('NavBarrComponent', () => {
  let component: NavBarrComponent;
  let fixture: ComponentFixture<NavBarrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarrComponent]
    });
    fixture = TestBed.createComponent(NavBarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
