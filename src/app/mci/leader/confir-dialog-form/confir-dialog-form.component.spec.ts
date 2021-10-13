import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirDialogFormComponent } from './confir-dialog-form.component';

describe('ConfirDialogFormComponent', () => {
  let component: ConfirDialogFormComponent;
  let fixture: ComponentFixture<ConfirDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirDialogFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
