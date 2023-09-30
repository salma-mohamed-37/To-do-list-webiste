import { Component, OnInit } from '@angular/core';
import { Task} from '../../interfaces/Task';
import { FilterHandlingService } from '../../services/filter-handling.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent implements OnInit
{
  constructor(private filterService : FilterHandlingService) {}
  addFlag: boolean= false;
  updateFlag: boolean= false;
  filter:string ="All"
  tasks : Task[] = [
    {
      id:1,
      content :"my first task",
      dueDate :  new Date('2023-09-28'),
      isCompleted : false
    },
    {
      id:2,
      content :"my second task",
      dueDate :  new Date('2023-09-28'),
      isCompleted : true
    },
    {
      id:3,
      content :"my third task",
      dueDate :  new Date('2023-09-28'),
      isCompleted : false
    }
  ]

  ngOnInit()
  {
    this.filter = "All"

    this.filterService.filter$.subscribe(filter => {
      this.filter = filter;
      console.log(this.filter);
    });
  }

  check(id:number)
  {
    if(this.tasks.find(t => t.id == id)!.isCompleted)
        this.tasks.find(t => t.id == id)!.isCompleted = false
    else
      this.tasks.find(t => t.id == id)!.isCompleted = true
  }

  add()
  {
    this.addFlag = true
    console.log(this.addFlag)
  }

  update()
  {
    this.updateFlag = true
    console.log(this.updateFlag)
  }


}
