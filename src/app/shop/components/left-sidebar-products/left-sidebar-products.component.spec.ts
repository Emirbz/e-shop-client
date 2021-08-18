import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarProductsComponent } from './left-sidebar-products.component';

describe('LeftSidebarProductsComponent', () => {
  let component: LeftSidebarProductsComponent;
  let fixture: ComponentFixture<LeftSidebarProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSidebarProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
