import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlocPage } from './addloc.page';

describe('AddlocPage', () => {
  let component: AddlocPage;
  let fixture: ComponentFixture<AddlocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
