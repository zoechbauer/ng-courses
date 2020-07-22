import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrgsComponent } from './list-orgs.component';

describe('ListOrgsComponent', () => {
  let component: ListOrgsComponent;
  let fixture: ComponentFixture<ListOrgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
