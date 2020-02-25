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
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { InstituteEditComponent } from './dashboard/institute-edit/institute-edit.component';
import { StudentEditComponent } from './dashboard/student-edit/student-edit.component';
import { ClassroomDashboardComponent } from './classroom/classroom-dashboard/classroom-dashboard.component';
import { AddClassroomComponent } from './classroom/add-classroom/add-classroom.component';
import { AddStudentComponent } from './classroom/add-student/add-student.component';
import { EditExamComponent } from './exam/edit-exam/edit-exam.component';
import { EditSubjectComponent } from './exam/edit-subject/edit-subject.component';



const routes: Routes = [
  
  { path: 'dashboard', component: DashboardViewComponent},
  { path: 'dashboard/:id/institute-edit', component: InstituteEditComponent},
  { path: 'dashboard/:id/student-edit', component: StudentEditComponent},
  { path: 'examination', component: ExaminationComponent},
  { path: 'gender', component: GenderComponent},
  { path: 'examination/addExam', component: AddExamComponent},
  { path: 'examination/editExam/:id', component: EditExamComponent},
  { path: 'examination/editSubject/:id', component: EditSubjectComponent},
  { path: 'examination/addSubject', component: AddSubjectComponent},
  { path: 'examination/addTopic', component: AddTopicComponent},
  { path: 'examination/addQuestionCategory', component: AddQuestionCategoryComponent},
  { path: 'test-series', component: TestSeriesComponent},
  { path: 'test-series/addTestSeries', component: AddTestSeriesComponent},
  { path: 'test-series/addTest', component: AddTestComponent},
  { path: 'test-series/:testSeries/:test/addQuestion', component: AddQuestionComponent},
  { path: 'test-series/questionTab/:testSeries/:test', component: QuestionPageComponent},
  { path: 'classroom', component: ClassroomDashboardComponent},
  { path: 'classroom/addClassroom', component: AddClassroomComponent},
  { path: 'classroom/addStudent', component: AddStudentComponent},
  { path: '',  redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '*', component: DashboardViewComponent },
  { path: '**', component: DashboardViewComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
