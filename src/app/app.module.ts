import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { TaskComponent } from "./tasks/task/task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { CardComponent } from "./shared/card/card.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserComponent,
        TaskComponent,
        TasksComponent,
        CardComponent,
        NewTaskComponent // <-- Add here
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        DatePipe
        // REMOVE NewTaskComponent from here
    ],
})
export class AppModule { }