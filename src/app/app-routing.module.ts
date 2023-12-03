import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'top',
    loadChildren: () =>
      import('./pages/stories/stories.module').then((m) => m.StoriesModule),
  },
  {
    path: 'top/:id',
    loadChildren: () =>
      import('./pages/stories/comments/comments.module').then(
        (m) => m.CommentsModule
      ),
  },
  {
    path: '',
    redirectTo: '/top',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
