import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {HistoryComponent} from "./history/history.component";
import {DepartmentsPageComponent} from "./departments-page/departments-page.component";
import {FreshmanGuideComponent} from "./freshman-guide/freshman-guide.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {AdmissionsComponent} from "./admissions/admissions.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "history", component: HistoryComponent},
  {path: "departments", component: DepartmentsPageComponent},
  {path: "freshmanGuide", component: FreshmanGuideComponent},
  {path: "rooms", component: RoomsComponent},
  {path: "admissions", component: AdmissionsComponent},
  {path: "contact", component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
