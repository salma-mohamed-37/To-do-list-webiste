import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent
{
  filters : string[] =[
    "All","Today", "Upcomming","Completed"
  ]

  addFilter(filter:string)
  {
    console.log(filter)
  }

}
