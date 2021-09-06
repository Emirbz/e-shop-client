import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ColumnMode} from '@swimlane/ngx-datatable';
import Product from '../../models/Product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, AfterViewInit {

  ColumnMode = ColumnMode;
  reorderable = true;
  categoryFormGroup: FormGroup;
  loadedProducts: Product[] = [];


  columns = [
    {prop: 'id', name: 'ID', width: 350},
    {prop: 'name', name: 'Name'},
    {prop: 'description', name: 'Description'},
    {prop: 'gender', name: 'Gender'},
    {prop: 'collection', name: 'Collection'},
    {prop: 'drop', name: 'Drop'},
    {prop: 'price', name: 'Price'},
    {prop: 'status', name: 'Status'},
  ];


  constructor(private productService: ProductService) {
  }

  ngAfterViewInit(): void {
    this.loadScript('assets/js/datatables/jquery.dataTables.min.js');
    this.loadScript('assets/js/datatables/custom-basic.js');


  }

  public loadScript(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementById('body').appendChild(node);


  }


  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(p => {
      this.loadedProducts = p.content;
    });
  }

}
