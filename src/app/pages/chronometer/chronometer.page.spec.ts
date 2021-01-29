import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChronometerPage } from './chronometer.page';

describe('ChronometerPage', () => {
  let component: ChronometerPage;
  let fixture: ComponentFixture<ChronometerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronometerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChronometerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
