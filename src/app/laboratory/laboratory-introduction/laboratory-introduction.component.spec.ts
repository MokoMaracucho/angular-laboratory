import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryIntroductionComponent } from './laboratory-introduction.component';

describe('LaboratoryIntroductionComponent', () => {
  let component: LaboratoryIntroductionComponent;
  let fixture: ComponentFixture<LaboratoryIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
