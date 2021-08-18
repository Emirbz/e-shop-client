import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-left-sidebar-products',
  templateUrl: './left-sidebar-products.component.html',
  styleUrls: ['./left-sidebar-products.component.scss']
})
export class LeftSidebarProductsComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadScript('assets/js/slick.js');
    this.loadScript('assets/js/script.js');


  }

  public loadScript(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementById('body').appendChild(node);


  }

}
