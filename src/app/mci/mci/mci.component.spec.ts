import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MciComponent } from './mci.component';

describe('MciComponent', () => {
  let component: MciComponent;
  let fixture: ComponentFixture<MciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
