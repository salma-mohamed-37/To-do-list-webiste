import { Component } from '@angular/core';
import { Task} from '../../interfaces/Task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent
{
  @Output() close = new EventEmitter<boolean>();

  addForm! :FormGroup;
  constructor(private fb: FormBuilder, private tasksService :TasksService){}

  ngOnInit() {
    this.addForm = this.fb.group({
      content : this.fb.control('',Validators.required),
      dueDate : this.fb.control('')
    });
  }
  submit()
  {
    let task : Task;
    task = {
      'id':0,
      'content' : this.addForm.get('content')!.value,
      'dueDate' : this.addForm.get('dueDate')!.value? this.addForm.get('dueDate')!.value : null,
      'isCompleted' : false
    }
    this.addTask(task)
    console.log("sent")
    console.log(task)

  }

  addTask(task:Task)
  {
    this.tasksService.addTask(task).subscribe({
      next: (res)=>{
        console.log("arrived");
        this.close.emit(false);
        console.log(task)
      },
      error: (err)=>{
        console.log(err)
      }
    })

  }


}
