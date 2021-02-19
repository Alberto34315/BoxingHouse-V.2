import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExecuteTrainingPage } from './execute-training.page';

describe('ExecuteTrainingPage', () => {
  let component: ExecuteTrainingPage;
  let fixture: ComponentFixture<ExecuteTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecuteTrainingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExecuteTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
