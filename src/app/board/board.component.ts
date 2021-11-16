import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivitiesApiService } from '../Acitivities/activities-api.service';
import { AuthApiService } from '../Auth/auth-api.service';
import { Class } from '../Classes/class.model';
import { ClassesApiService } from '../Classes/classes-api.service';
import { SubscriptionsApiService } from '../subscriptions/subscriptions-api.service';
import { Week } from '../Works/week.model';
import { WorksApiService } from '../Works/works-api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = "BEFv0LWfGe9QYxnKmh4vSwXZn0UCiCS4VwOy44cRPrhbfG5sqbAZTY1huECnTTBtzjeXcBsiqBVl1RWyUrEtnDk";

  title = 'frontend';
  loading = false;
  classesListSubs: Subscription;
  classesList: Class[];
  activitiesListSubs: Subscription;
  activitiesList: Class[];
  worksSubs: Subscription;
  authSubs: Subscription;
  week: Week;
  weekSubs: Subscription;
  isSubscribed:Observable<Boolean>
  subscription: PushSubscription | null

  constructor(
    private classesApi: ClassesApiService, 
    private activitesApi: ActivitiesApiService, 
    private http: HttpClient, 
    private authService: AuthApiService,
    private worksService: WorksApiService,
    private router: Router,
    private route: ActivatedRoute,
    private swPush: SwPush,
    private subscriptionsService: SubscriptionsApiService
    //private newsletterService: NewsletterService
    ) {
  }

  
  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then((sub)=>{
      this.subscriptionsService.addPushSubscriber(sub).then(console.log).catch(console.log)
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

  unsubscribeNotifications(){
    let savedSubscription = this.subscription;
    this.swPush.unsubscribe()
    .then(()=>{
        if (savedSubscription) 
          this.subscriptionsService.removePushSubscriber(savedSubscription)
    })
  }
  
  ngOnInit() {
    let today: Date = new Date(Date.now());
    let day = today.getDay();
    let monday = today;
    monday.setDate(monday.getDate() - day + (day == 0 ? -6: 1));
    this.worksService.getWeek(monday).then((res: any)=>this.week=res)
    this.isSubscribed = this.swPush.subscription.pipe(map((sub)=>{return !!sub}));
    this.swPush.subscription.subscribe((sub)=>this.subscription=sub)
  }

  logout() {
    this.authService.logout().then((res: any)=> {
      console.log(res);
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
  }).catch(console.error);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  prevWeek(){
    let newDate: Date = this.week.start_date;
    newDate.setDate(this.week.start_date.getDate()-7);
    this.worksService.getWeek(newDate).then((res: any)=>this.week = res);
  }

  nextWeek(){
    let newDate: Date = this.week.start_date;
    newDate.setDate(this.week.start_date.getDate()+7);
    this.worksService.getWeek(newDate).then((res: any)=>this.week = res);
  }

  saveWorks(){
    this.loading =true;
    this.worksService.saveWeek(this.week).then(()=>{
      this.loading = false;  
      console.log});
  }

}
