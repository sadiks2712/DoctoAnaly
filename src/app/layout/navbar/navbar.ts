import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  menuOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // ✅ Proper Logout (Fully Working)
  async logout() {
    try {
      // 1️⃣ Sign out from Firebase
      await this.auth.logout();
      console.log('User logged out successfully');

      // 2️⃣ Redirect explicitly to login page
      await this.router.navigateByUrl('/login', { replaceUrl: true });

    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}