import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExaminationComponent } from './exam/examination/examination.component';
import { AddExamComponent } from './exam/add-exam/add-exam.component';
import { AddSubjectComponent } from './exam/add-subject/add-subject.component';
import { AddTopicComponent } from './exam/add-topic/add-topic.component';
import { AddQuestionCategoryComponent } from './exam/add-question-category/add-question-category.component';



const routes: Routes = [
  { path: 'examination', component: ExaminationComponent},
  { path: 'examination/addExam', component: AddExamComponent},
  { path: 'examination/addSubject', component: AddSubjectComponent},
  { path: 'examination/addTopic', component: AddTopicComponent},
  { path: 'examination/addQuestionCategory', component: AddQuestionCategoryComponent},
  { path: '', component: ExaminationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
