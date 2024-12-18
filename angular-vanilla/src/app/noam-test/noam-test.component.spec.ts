import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoamTestComponent } from './noam-test.component';

describe('NoamTestComponent', () => {
  let component: NoamTestComponent;
  let fixture: ComponentFixture<NoamTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoamTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoamTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
