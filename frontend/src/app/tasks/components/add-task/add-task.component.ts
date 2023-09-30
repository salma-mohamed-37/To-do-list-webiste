import { Component } from '@angular/core';
import { Task} from '../../interfaces/Task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent
{
  addForm! :FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.addForm = this.fb.group({
      content : this.fb.control('',Validators.required),
      dueDate : this.fb.control('',Validators.required)
    });
  }
  submit()
  {
    let task : Task;
    task = {
      'id':0,
      'content' : this.addForm.get('content')!.value,
      'dueDate' : new Date(this.addForm.get('dueDate')!.value),
      'isCompleted' : false
    }

    console.log(task)


  }


}
