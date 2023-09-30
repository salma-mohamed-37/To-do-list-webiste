import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent
{
  updateForm! :FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.updateForm = this.fb.group({
      content : this.fb.control('',Validators.required),
      dueDate : this.fb.control('',Validators.required)
    });
  }

  submit()
  {
    let task : Task;
    task = {
      'id':0,
      'content' : this.updateForm.get('content')!.value,
      'dueDate' : new Date(this.updateForm.get('dueDate')!.value),
      'isCompleted' : false
    }
    console.log(task)
  }

}
