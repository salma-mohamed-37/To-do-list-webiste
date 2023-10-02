import { Component, OnInit } from '@angular/core';
import { Task} from '../../interfaces/Task';
import { FilterHandlingService } from '../../services/filter-handling.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent implements OnInit
{
  constructor(private filterService : FilterHandlingService , private  tasksService: TasksService) {}
  addFlag: boolean= false;
  updateFlag: boolean= false;
  id:number =0;
  filter:string ="All"
  tasks : Task[] = []

  ngOnInit()
  {
    this.filter = "All"

    this.filterService.filter$.subscribe(filter => {
      this.filter = filter;

    this.tasksService.getTasks(this.filter).subscribe({
      next: (tasks)=>{
        console.log("arrived");
        this.tasks=tasks
      },
      error: (err)=>{
        console.log(err)
      }
    })
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
  }

  update(id:number)
  {
    this.updateFlag = true
    this.id = id
  }


}
