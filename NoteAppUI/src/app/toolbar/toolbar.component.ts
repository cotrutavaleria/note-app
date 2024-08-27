import { Component } from '@angular/core';
import { AngularMaterialsModule } from '../shared/resources/app.angular-material.module';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AngularMaterialsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

}
