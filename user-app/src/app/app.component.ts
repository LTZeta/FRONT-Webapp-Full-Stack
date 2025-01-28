import { Component } from '@angular/core';
import { UserAppComponent } from "./components/user-app.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [UserAppComponent]
})
export class AppComponent {
  title = 'user-app';
}
