import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenComponent } from './open.component';

describe('OpenComponent', () => {
  let component: OpenComponent;
  let fixture: ComponentFixture<OpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
