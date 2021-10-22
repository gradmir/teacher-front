import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity } from '../Acitivities/acitvity.model';
import { ActivitiesApiService } from '../Acitivities/activities-api.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  users: any;
  activities: Activity[]
  RankForm:FormGroup;

  constructor(private activitiesService: ActivitiesApiService) { }

  ngOnInit(): void {
    let start_date = new Date()
    let end_date = new Date()
    start_date.setDate(start_date.getDate() - 6)
    this.RankForm = new FormGroup({
      'start_date': new FormControl(formatDate(start_date, 'yyyy-MM-dd', 'en'),[Validators.required]),
      'end_date':new FormControl(formatDate(end_date, 'yyyy-MM-dd', 'en'),[Validators.required]),
    });
    
    this.activitiesService.getActivities().toPromise().then(res => {
      this.activities = res
      this.getRank()
    })
  }

  getRank(){
    this.activitiesService.getRank(new Date(this.RankForm.get('start_date')?.value), new Date(this.RankForm.get('end_date')?.value))
      .then((res) => this.users = res)
  }

}
