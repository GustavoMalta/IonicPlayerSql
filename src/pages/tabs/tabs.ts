import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NavegaPage } from '../navega/navega';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NavegaPage;

  constructor() {

  }
}
