import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectExercisePage } from './select-exercise.page';

describe('SelectExercisePage', () => {
  let component: SelectExercisePage;
  let fixture: ComponentFixture<SelectExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExercisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
