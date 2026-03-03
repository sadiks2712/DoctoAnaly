import { Component } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Hero } from '../hero/hero';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Hero,Navbar],
  templateUrl: './landing.html'
})
export class LandingComponent {}