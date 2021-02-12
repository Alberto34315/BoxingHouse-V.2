import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddtrainingPage } from './addtraining.page';

describe('AddtrainingPage', () => {
  let component: AddtrainingPage;
  let fixture: ComponentFixture<AddtrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtrainingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddtrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
