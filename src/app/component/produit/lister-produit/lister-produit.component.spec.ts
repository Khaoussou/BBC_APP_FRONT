import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerProduitComponent } from './lister-produit.component';

describe('ListerProduitComponent', () => {
  let component: ListerProduitComponent;
  let fixture: ComponentFixture<ListerProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListerProduitComponent]
    });
    fixture = TestBed.createComponent(ListerProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
