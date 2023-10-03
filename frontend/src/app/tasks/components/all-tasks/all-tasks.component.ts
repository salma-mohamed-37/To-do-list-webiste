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
      this.getTasks();

    });
  }

  getTasks()
  {
    this.tasksService.getTasks(this.filter).subscribe({
      next: (tasks)=>{
        console.log("arrived");
        this.tasks=tasks
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  check(id:number)
  {
    var done :boolean
    if(this.tasks.find(t => t.id == id)!.isCompleted)
    {
      this.tasks.find(t => t.id == id)!.isCompleted = false
      done = false
    }
    else
    {
      this.tasks.find(t => t.id == id)!.isCompleted = true
      done = true
    }
    this.checkTask(id,done)
  }

  add(value:boolean)
  {
    this.addFlag = value
    if(value ==false)
    {
      this.getTasks()
    }
  }

  update(id:number,value:boolean)
  {
    this.updateFlag = value
    this.id = id
    if(value ==false)
    {
      this.getTasks()
    }

  }

  delete(id:number)
  {
    this.tasksService.delete(id).subscribe({
      next: (res)=>{
        console.log("arrived");
        this.tasks=this.tasks.filter(x=>x.id != id)
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  checkTask(id:number,completed:boolean)
  {
    this.tasksService.check(id,completed).subscribe({
      next: (res)=>{
        console.log("arrived");
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }





}
