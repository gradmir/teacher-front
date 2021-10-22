import { WeekLine } from "./week-line.model";

export class Week {
    start_date: Date
    end_date: Date
    week_lines: WeekLine[]

    constructor(data: any){
      this.start_date = new Date(data.start_date)
      this.end_date = new Date(data.end_date)
      this.week_lines = data.week_lines
    }
  }