import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent
{
  @Input() id: number = 0
  task! : Task ;
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

  updateForm! :FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit() {

    this.task = this.tasks[this.id-1];

    this.updateForm = this.fb.group({
      content : this.fb.control(this.task.content,Validators.required),
      dueDate : this.fb.control(this.task.dueDate.toISOString().split("T")[0])
    });
  }

  submit()
  {
   let c  = this.task.isCompleted
    this.task = {
      'id':0,
      'content' : this.updateForm.get('content')!.value,
      'dueDate' : new Date(this.updateForm.get('dueDate')!.value),
      'isCompleted' :c
    }
    console.log(this.updateForm.get('dueDate')!.value)
    console.log(this.task.dueDate.toISOString().split("T")[0])
  }

}
