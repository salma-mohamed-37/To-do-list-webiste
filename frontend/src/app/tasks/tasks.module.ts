import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';




@NgModule({
  declarations: [
    TasksComponent,
    AllTasksComponent,
    SidebarComponent,
    AddTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    DialogModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
