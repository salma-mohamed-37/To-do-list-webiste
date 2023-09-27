import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    TasksComponent,
    AllTasksComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
