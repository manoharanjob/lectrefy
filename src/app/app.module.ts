import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDateFormatPipe } from './pipe/customdateformat.pipe';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AppRoutingModule, AppComponents } from './app.route';
import { StatusDescriptionPipe } from './pipe/statusdesc.pipe.1';
import { UserRolePipe } from './pipe/userrole.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppComponents,
    CustomDateFormatPipe,
    StatusDescriptionPipe,
    UserRolePipe
  ],
  imports: [
    BrowserModule,   
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule ,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ], 
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
