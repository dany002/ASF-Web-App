import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import { AutoOpenMenuComponent } from './auto-open-menu/auto-open-menu.component';
import {MatButtonModule} from "@angular/material/button";
import { HomeComponent } from './home/home.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import { AddDepartmentDialogComponent } from './add-department-dialog/add-department-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EditDepartmentDialogComponent } from './edit-department-dialog/edit-department-dialog.component';
import { AddTeamLeaderDialogComponent } from './add-team-leader-dialog/add-team-leader-dialog.component';
import { EditTeamLeaderDialogComponent } from './edit-team-leader-dialog/edit-team-leader-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { HistoryComponent } from './history/history.component';
import { DepartmentsPageComponent } from './departments-page/departments-page.component';
import { FreshmanGuideComponent } from './freshman-guide/freshman-guide.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AdmissionsComponent } from './admissions/admissions.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    AutoOpenMenuComponent,
    HomeComponent,
    AddDepartmentDialogComponent,
    EditDepartmentDialogComponent,
    AddTeamLeaderDialogComponent,
    EditTeamLeaderDialogComponent,
    DeleteConfirmationDialogComponent,
    HistoryComponent,
    DepartmentsPageComponent,
    FreshmanGuideComponent,
    RoomsComponent,
    AdmissionsComponent,
    FooterComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
