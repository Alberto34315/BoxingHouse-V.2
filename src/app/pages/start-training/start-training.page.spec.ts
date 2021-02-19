import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartTrainingPage } from './start-training.page';

describe('StartTrainingPage', () => {
  let component: StartTrainingPage;
  let fixture: ComponentFixture<StartTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTrainingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
