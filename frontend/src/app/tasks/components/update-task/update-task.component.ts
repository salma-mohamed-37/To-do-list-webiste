import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../interfaces/Task';
import { Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent
{
  @Input() id: number = 0
  @Output() close=new EventEmitter<boolean>();
  task! : Task ;
  updateForm! :FormGroup;
  constructor(private fb: FormBuilder, private tasksService :TasksService){}

  ngOnInit() {
    this.updateForm = this.fb.group({
      content : this.fb.control('',Validators.required),
      dueDate : this.fb.control('')
    });

    this.getTask()

  }

  getTask():boolean
  {
    this.tasksService.getTask(this.id).subscribe({
      next: (task)=>{
        console.log("task arrived");
        this.task = task
        this.updateForm.get('content')!.setValue(this.task.content)
        this.updateForm.get('dueDate')!.setValue(this.task.dueDate.split("T")[0]);
      },
      error: (err)=>{
        console.log(err)
      }
    })
    return true
  }

  submit()
  {
   let c  = this.task.isCompleted
   this.task.content = this.updateForm.get('content')!.value
   this.task.dueDate = this.updateForm.get('dueDate')!.value? this.updateForm.get('dueDate')!.value : null,

  this.tasksService.update(this.id,this.task).subscribe({
    next: (tasks)=>{
      console.log("arrived");
      this.close.emit(false);
    },
    error: (err)=>{
      console.log(err)
    }
  })

  }

}
