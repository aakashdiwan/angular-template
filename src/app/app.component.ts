import { Component } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todaysDate = new Date();

  user: any[] = [{
    name: 'Aakash',
    email: 'aakash_diwan@merilytics.com'
  }];

  stages: any[] = [
    {
      name: 'Stage 1',
      content: [
        'Select feedback provider', 'Review feedback recievers'
      ],
      startDate: new Date('12 Sept 2020'),
      endDate: new Date('12 Sept 2020'),
      progress: 'Progressed',
      completed: true
    },
    {
      name: 'Stage 2',
      content: [
        'Feedback providers approval', 'Review no. of appraisals'
      ],
      startDate: new Date('13 Sept 2020'),
      endDate: new Date('13 Sept 2020'),
      progress: 'Progressed',
      completed: true
    },
    {
      name: 'Stage 3',
      content: [
        'Provide feedback'
      ],
      startDate: new Date('14 Sept 2020'),
      endDate: new Date('14 Sept 2020'),
      progress: 'Progressed',
      completed: true
    },
    {
      name: 'Stage 4',
      content: [
        'Self Appraisal'
      ],
      startDate: new Date('14 Sept 2020'),
      endDate: new Date('16 Sept 2020'),
      progress: 'Progressed',
      completed: true
    },
    {
      name: 'Stage 5',
      content: [
        'L1 - consolidation & approvals'
      ],
      startDate: new Date('16 Sept 2020'),
      endDate: new Date('20 Sept 2020'),
      progress: 'Progressed',
      completed: true
    },
    {
      name: 'Stage 6',
      content: [
        'L2+ consolidation & approvals'
      ],
      startDate: new Date('16 Sept 2020'),
      endDate: new Date('24 Sept 2020'),
      progress: 'Inprogress',
      completed: false
    },
    {
      name: 'Stage 7',
      content: [
        'Management reviews'
      ],
      startDate: new Date('24 Sept 2020'),
      endDate: new Date('26 Sept 2020'),
      progress: 'Yet to start',
      completed: false
    },
    {
      name: 'Stage 8',
      content: [
        'Discuss appraisal'
      ],
      startDate: new Date('26 Sept 2020'),
      endDate: new Date('28 Sept 2020'),
      progress: 'Yet to start',
      completed: false
    },

  ];


  private onGoingStage = this.stages.find((name) => {
    console.log(name);
    console.log(name.completed);

    return name.completed === false;
  });


  onGoingStageEndDate = this.onGoingStage.endDate;
  private counter$: Observable<number>;
  private subscription: Subscription;
  timeLeft: string;
  navbarTimeLeft: string;
  diff: number;

  constructor() {}

  ngOnInit(): void {
    this.counter$ = interval(1000).pipe(
      map((x) => {
        x = Math.floor(
          (this.onGoingStageEndDate.getTime() - new Date().getTime()) / 1000
        );
        return x;
      })
    );
    this.subscription = this.counter$.subscribe(
      (x) => {
        this.timeLeft = this.headerTimer(this.dhms(x));
        this.navbarTimeLeft = this.sidebarTimer(this.dhms(x));

      });
  }

  // countdown

  dhms(t) {
    if (t < 0){
      overdue = 'overdue by ';
    }else{
      overdue = '';
    }

    t = Math.abs(t);
    var days,
        hours,
        minutes,
        seconds,
        overdue;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;
  const array:any[] = [];
  array.push(overdue);
  array.push(days);
  array.push(hours);
  array.push(minutes);
  array.push(seconds);
  return array;
  }

  headerTimer(arr){               // for top right countdown timer
    return [arr[0] + arr[1] + 'days ', arr[2] + 'h ', arr[3] + 'm ', arr[4] + 's for ' + this.onGoingStage.name + ' completion'].join('');
  }

  sidebarTimer(arr){              // for individual stage timer on the sidebar
    return [arr[1] + 'd:' + arr[2] + 'h:' + arr[3] + 'm:' + arr[4] + 's'].join('');
  }

}
