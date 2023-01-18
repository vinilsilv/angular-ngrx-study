import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHideInputComponent } from './show-hide-input.component';

describe('ShowHideInputComponent', () => {
  let component: ShowHideInputComponent;
  let fixture: ComponentFixture<ShowHideInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHideInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowHideInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
