import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandselectPage } from './landselect.page';

describe('LandselectPage', () => {
  let component: LandselectPage;
  let fixture: ComponentFixture<LandselectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandselectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandselectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
