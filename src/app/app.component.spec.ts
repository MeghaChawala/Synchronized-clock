import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {

  let component = new AppComponent();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'synchronized_clock'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('synchronized_clock');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('synchronized_clock app is running!');
  });

  describe('ngOnInit', () => {

    it('Should run `startclock`, If it is True', () => {
      spyOn(component, 'startclock');
      component.clockIsAuto = true;
      component.ngOnInit();
      expect(component.startclock).toHaveBeenCalled();
    });

    it('`customClock` Should be equal to `currentClock` AND Should not run `startclock`, If it is False', () => {
      spyOn(component, 'startclock');
      component.clockIsAuto = false;
      component.ngOnInit();
      expect(component.customClock).toEqual(component.currentClock);
      expect(component.startclock).not.toHaveBeenCalled();
    });
  });

  describe('changeClockState', () => {

    it('Should change `clockIsAuto` to False and Should not run `startclock`, If it is True', () => {
      spyOn(component, 'startclock');
      component.clockIsAuto = true;
      component.changeClockState();
      expect(component.clockIsAuto).toBeFalse();
      expect(component.startclock).not.toHaveBeenCalled();
      expect(component.clockInterval).toBeDefined;
    });

    it('Should change `clockIsAuto` to True AND `customClock` Should be equal to `currentClock` AND Should run `startclock` AND Should clear `clockInterval`, If it is False', () => {
      spyOn(component, 'startclock');
      component.clockIsAuto = false;
      component.clockInterval = 2;
      component.changeClockState();
      expect(component.clockIsAuto).toBeTrue();
      expect(component.customClock).toEqual(component.currentClock);
      expect(component.startclock).toHaveBeenCalled();
      expect(component.clockInterval).not.toBeDefined;
    });
  });

  describe('setClock', () => {

    it('Should set clock', () => {
      component.setClock(1, 1, 1);
      expect(component.setClock(1, 1, 1)).toEqual({
        hour: 1,
        minute: 1,
        second: 1,
        period: 'AM',
        hourHandPosition: { transform: 'rotate(120.5deg)' },
        minuteHandPosition: { transform: 'rotate(96.1deg)' },
        secondHandPosition: { transform: 'rotate(96deg)' }
      });
    });

    it('Should set clock when hour is equal to null', () => {
      component.setClock(null, 1, 1);
      expect(component.setClock(null, 1, 1)).toEqual({
        hour: 12,
        minute: 1,
        second: 1,
        period: 'AM',
        hourHandPosition: { transform: 'rotate(90.5deg)' },
        minuteHandPosition: { transform: 'rotate(96.1deg)' },
        secondHandPosition: { transform: 'rotate(96deg)' }
      });
    });

    it('Should set clock when minute is equal to null', () => {
      component.setClock(1, null, 1);
      expect(component.setClock(1, null, 1)).toEqual({
        hour: 1,
        minute: 0,
        second: 1,
        period: 'AM',
        hourHandPosition: { transform: 'rotate(120deg)' },
        minuteHandPosition: { transform: 'rotate(90.1deg)' },
        secondHandPosition: { transform: 'rotate(96deg)' }
      });
    });

    it('Should set clock when second is equal to null', () => {
      component.setClock(1, 1, null);
      expect(component.setClock(1, 1, null)).toEqual({
        hour: 1,
        minute: 1,
        second: 0,
        period: 'AM',
        hourHandPosition: { transform: 'rotate(120.5deg)' },
        minuteHandPosition: { transform: 'rotate(96deg)' },
        secondHandPosition: { transform: 'rotate(90deg)' }
      });
    });
  });

  describe('updateClock', () => {
    it('Should update clock', () => {
      component.customClock = {
        hour: 1,
        minute: 1,
        second: 1,
        period: 'AM',
        hourHandPosition: { transform: 'rotate(120.5deg)' },
        minuteHandPosition: { transform: 'rotate(96.1deg)' },
        secondHandPosition: { transform: 'rotate(96deg)' }
      };
      const mockEvent = { target: { value: '1' } };
      component.updateClock('hour', mockEvent);
      expect(component.currentClock).toEqual({
        hour: 1,
        minute: 1,
        second: 1,
        period: 'AM',
        hourHandPosition: { transform: 'rotate(120.5deg)' },
        minuteHandPosition: { transform: 'rotate(96.1deg)' },
        secondHandPosition: { transform: 'rotate(96deg)' }
      });
    });
  });

});

