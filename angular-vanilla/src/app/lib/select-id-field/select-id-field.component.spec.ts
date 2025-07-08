import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIdFieldComponent } from './select-id-field.component';

describe('SelectIdFieldComponent', () => {
  let component: SelectIdFieldComponent;
  let fixture: ComponentFixture<SelectIdFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectIdFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectIdFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
