import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { DsaComponent } from './dsa/dsa.component';
import { BlogComponent } from './blog/blog.component';
import { CoursesComponent } from './courses/courses.component';
import { ChatComponent } from './chat/chat.component';
import { MoviesComponent } from './movies/movies.component';
import { WordleComponent } from './wordle/wordle.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dsa', component: DsaComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'movie', component: MoviesComponent},
  { path: 'wordle', component: WordleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
