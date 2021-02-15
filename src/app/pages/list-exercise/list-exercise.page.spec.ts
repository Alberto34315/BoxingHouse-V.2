import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListExercisePage } from './list-exercise.page';

describe('ListExercisePage', () => {
  let component: ListExercisePage;
  let fixture: ComponentFixture<ListExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExercisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
