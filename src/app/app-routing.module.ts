import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExaminationComponent } from './exam/examination/examination.component';
import { AddExamComponent } from './exam/add-exam/add-exam.component';
import { AddSubjectComponent } from './exam/add-subject/add-subject.component';
import { AddTopicComponent } from './exam/add-topic/add-topic.component';
import { AddQuestionCategoryComponent } from './exam/add-question-category/add-question-category.component';
import { TestSeriesComponent } from './test-series/test-series/test-series.component';
import { AddTestSeriesComponent } from './test-series/add-test-series/add-test-series.component';
import { AddTestComponent } from './test-series/add-test/add-test.component';
import { AddQuestionComponent } from './test-series/add-question/add-question.component';
import { QuestionPageComponent } from './test-series/question-page/question-page.component';
import { GenderComponent } from './exam/gender/gender.component';



const routes: Routes = [
  { path: '', component: ExaminationComponent},
  { path: 'examination', component: ExaminationComponent},
  { path: 'gender', component: GenderComponent},
  { path: 'examination/addExam', component: AddExamComponent},
  { path: 'examination/addSubject', component: AddSubjectComponent},
  { path: 'examination/addTopic', component: AddTopicComponent},
  { path: 'examination/addQuestionCategory', component: AddQuestionCategoryComponent},
  { path: 'test-series', component: TestSeriesComponent},
  { path: 'test-series/addTestSeries', component: AddTestSeriesComponent},
  { path: 'test-series/addTest', component: AddTestComponent},
  // { path: 'test-series/addQuestion', component: AddQuestionComponent},
  { path: 'test-series/questionTab', component: QuestionPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
