import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

interface ClockInfo {
  hour: number;
  minute: number;
  second: number;
  period: 'AM' | 'PM';
  hourHandPosition?: any;
  minuteHandPosition?: any;
  secondHandPosition?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'synchronized_clock';
  digits: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  public clockIsAuto: boolean = true;

  public currentClock: ClockInfo = {
    hour: 0,
    minute: 0,
    second: 0,
    period: 'AM',
    hourHandPosition: { transform: `rotate(90deg)` },
    minuteHandPosition: { transform: `rotate(90deg)` },
    secondHandPosition: { transform: `rotate(90deg)` }
  };
  public customClock: ClockInfo = {
    hour: 0,
    minute: 0,
    second: 0,
    period: 'AM',
    hourHandPosition: { transform: `rotate(90deg)` },
    minuteHandPosition: { transform: `rotate(90deg)` },
    secondHandPosition: { transform: `rotate(90deg)` },
  };
  public clockInterval: any;

  constructor(){}
  ngOnInit(){
    if (this.clockIsAuto) {
      this.startclock();
    } else {
      this.customClock = this.currentClock;
    }
  }

  changeClockState() {
    this.clockIsAuto = !this.clockIsAuto;
    if (this.clockIsAuto) {
      this.startclock();
    } else {
      this.customClock = this.currentClock;
      this.clockInterval && clearInterval(this.clockInterval);
    }
  }

  startclock() {
    let date = new Date();
    this.clockInterval = setInterval(() => {
      date = new Date();
      this.currentClock = this.setClock(date.getHours(), date.getMinutes(), date.getSeconds());
    }, 1000);
  }

  setClock(hour: number | null, minute: number | null, second: number | null): ClockInfo {
    hour = !hour || hour == null ? 0 : hour;
    minute = !minute || minute == null ? 0 : minute;
    second = !second || second == null ? 0 : second;
    let period : 'AM' | 'PM' = hour < 12 ? 'AM' : 'PM';
    period = (hour === 24 || hour === 0) ? 'AM' : period;
    hour = hour < 13 ? hour : hour - 12;
    return {
      hour: hour === 0 ? 12 : hour,
      minute: minute,
      second: second,
      period: period,
      hourHandPosition: {
        transform: `rotate(${(hour * 30 ) + Math.floor(minute/12) * 6}deg)`
      },
      minuteHandPosition: {
        transform: `rotate(${(minute * 6)}deg)`
      },
      secondHandPosition: {
        transform: `rotate(${(second * 6 )}deg)`
      },
    };
    
  }

  updateClock(inputName: 'hour' | 'minute' | 'second', event: any) {
    const value = event.target.value;
    if (inputName == 'hour' && value > 24) {
      this.customClock.hour = this.currentClock.hour;
    }
    if (inputName == 'minute' && value > 59) {
      this.customClock.minute = this.currentClock.minute;
    }
    if (inputName == 'second' && value > 59) {
      this.customClock.second = this.currentClock.second;
    }
    this.currentClock = this.setClock(this.customClock.hour, this.customClock.minute, this.customClock.second);

  }
}
