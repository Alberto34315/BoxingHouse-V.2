import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListfriendsPage } from './listfriends.page';

describe('ListfriendsPage', () => {
  let component: ListfriendsPage;
  let fixture: ComponentFixture<ListfriendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfriendsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListfriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
