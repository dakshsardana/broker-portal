import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // ✅ Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // ✅ Add RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
