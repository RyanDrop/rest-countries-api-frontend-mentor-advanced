import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toggleDarkMode() {
    const $html = document.documentElement;
    $html.classList.toggle('dark-mode');
  }
}
