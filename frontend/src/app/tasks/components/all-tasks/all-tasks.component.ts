import { Component, OnInit } from '@angular/core';
import { Task} from '../../interfaces/Task';
import { FilterHandlingService } from '../../services/filter-handling.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit
{
  constructor(private filterService : FilterHandlingService) {}
  filter:string ="All"
  tasks : Task[] = []

  ngOnInit()
  {
    this.filter = "All"

    this.filterService.filter$.subscribe(filter => {
      this.filter = filter;
      // Perform any necessary actions with the filter value
      console.log(this.filter);
    });
  }


}
