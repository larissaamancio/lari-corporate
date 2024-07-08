import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFilialComponent } from './new-filial.component';

describe('NewFilialComponent', () => {
  let component: NewFilialComponent;
  let fixture: ComponentFixture<NewFilialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFilialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
