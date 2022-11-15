import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TobarComponent } from './tobar.component';

describe('TobarComponent', () => {
  let component: TobarComponent;
  let fixture: ComponentFixture<TobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TobarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
