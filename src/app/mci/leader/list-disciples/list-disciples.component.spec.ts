import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisciplesComponent } from './list-disciples.component';

describe('ListDisciplesComponent', () => {
  let component: ListDisciplesComponent;
  let fixture: ComponentFixture<ListDisciplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDisciplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDisciplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
