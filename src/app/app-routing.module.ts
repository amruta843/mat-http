import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsDashboardComponent } from './shared/components/posts-dashboard/posts-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: PostsDashboardComponent,
    
  },
  {
    path:'posts',
    component: PostsDashboardComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
