import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBarrComponent } from './slide-barr.component';

describe('SlideBarrComponent', () => {
  let component: SlideBarrComponent;
  let fixture: ComponentFixture<SlideBarrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideBarrComponent]
    });
    fixture = TestBed.createComponent(SlideBarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
