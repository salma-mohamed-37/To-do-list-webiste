import { Component } from '@angular/core';
import { FilterHandlingService } from '../../services/filter-handling.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent
{
  constructor(private filterService : FilterHandlingService) {}
  filters : string[] =[
    "All","Today", "Upcomming","Completed"
  ]

  addFilter(filter:string)
  {
    console.log(filter)
    this.filterService.setFilter(filter)
  }

}
