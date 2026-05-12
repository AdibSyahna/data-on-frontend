import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { Layout } from '../../services/layout/layout';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Dashboard } from '../dashboard/dashboard';

interface SidenavMenu {
  title: string;
  icon: string;
  component: any;
};

@Component({
  selector: 'app-main',
  imports: [MatSidenavModule, NgTemplateOutlet, MatIcon, MatButtonModule, NgComponentOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  public activePage: any = Dashboard;
  public activeContent: string = "Dashboard";
  public readonly sidenavMenus: SidenavMenu[] = [{
    title: 'Daftar Tamu',
    icon: 'dashboard',
    component: Dashboard
  }
  ];

  public constructor(public layout: Layout) { }

  public changeContent(menu: SidenavMenu) {
    this.activeContent = menu.title;
    this.activePage = menu.component;
  }

}
