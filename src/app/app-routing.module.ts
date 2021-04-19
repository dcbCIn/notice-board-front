import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeDeleteComponent } from './notice-delete/notice-delete.component';
import { NoticeFormComponent } from './notice-form/notice-form.component';
import { NoticesComponent } from './notices/notices.component';

const routes: Routes = [
  { path: '', component: NoticesComponent },
  { path: 'notice', component: NoticesComponent },
  { path: 'notice/new', component: NoticeFormComponent },
  { path: 'notice/:id/view', component: NoticeFormComponent },
  { path: 'notice/:id/update', component: NoticeFormComponent },
  { path: 'notice/:id/delete', component: NoticeDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
