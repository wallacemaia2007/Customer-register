import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
