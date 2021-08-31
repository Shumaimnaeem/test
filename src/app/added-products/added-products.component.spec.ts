import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedProductsComponent } from './added-products.component';

describe('AddedProductsComponent', () => {
  let component: AddedProductsComponent;
  let fixture: ComponentFixture<AddedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
