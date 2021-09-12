import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../admin/services/category.service';
import Category from '../../../admin/models/Category';
import {SizeService} from '../../../admin/services/size.service';
import {SaleService} from '../../../admin/services/sale.service';
import Size from '../../../admin/models/Size';
import {ProductService} from '../../../admin/services/product.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Product from '../../../admin/models/Product';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-left-sidebar-products',
  templateUrl: './left-sidebar-products.component.html',
  styleUrls: ['./left-sidebar-products.component.scss']
})
export class LeftSidebarProductsComponent implements OnInit, AfterViewInit {
  /*---- loaded data ----- */
  loadedCategories: Category[] = [];
  loadedSizes: Size[] = [];
  loadedProducts: Product [] = [];

  /* --- loaders --- */
  categoriesHasBeenLoaded = false;
  productsHasBeenLoaded = false;
  sizesHasBeenLoaded = false;

  /* --- pagination ---- */
  numberOfElements = 0;
  pageNumber = 1;
  pageSize = 0;

  /* ---- Filters ----- */
  criteria: { categories: number[], sizes: number[], collection: string, minPrice: number, maxPrice: number } = {
    categories: [],
    sizes: [],
    collection: '',
    minPrice: 0,
    maxPrice: 10000
  };


  constructor(private categoryService: CategoryService,
              private sizeService: SizeService,
              private productService: ProductService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.loadSizes();
    this.loadCategories();
    this.loadProducts(this.criteria);
  }

  ngAfterViewInit(): void {
    this.loadScript('assets/js/slick.js');
    this.loadScript('assets/js/price-range.js');
    this.loadScript('assets/js/script.js');


  }

  public loadScript(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementById('body').appendChild(node);


  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe(c => {
      this.loadedCategories = c;
      this.categoriesHasBeenLoaded = true;
    }, error => {
      this.categoriesHasBeenLoaded = true;
    });
  }

  private loadSizes() {
    this.sizeService.getSizes().subscribe(c => {
      this.loadedSizes = c;
      this.sizesHasBeenLoaded = true;
    }, error => {
      this.sizesHasBeenLoaded = true;
    });
  }


  loadProducts(criteria?: { categories: number[]; sizes: number[]; collection: string; minPrice: number; maxPrice: number }) {
    console.log(criteria);
    this.productsHasBeenLoaded = false;
    this.productService.getAllProducts().subscribe(p => {
      this.loadedProducts = p.content;
      this.numberOfElements = p.numberOfElements;
      this.pageNumber = p.number + 1;
      this.pageSize = p.size;
      this.productsHasBeenLoaded = true;
    }, error => {
      this.productsHasBeenLoaded = true;
    });
  }


  async setCategoriesFilter(event, id: string) {
    if (event.target.checked) {
      this.criteria.categories.push(+id);
    } else {
      this.criteria.categories = this.criteria.categories.filter(cat => cat !== +id);
    }
    this.loadProducts(this.criteria);
  }

  async setSizesFilter(event, id: string) {
    if (event.target.checked) {
      this.criteria.sizes.push(+id);
    } else {

      this.criteria.sizes = this.criteria.sizes.filter(s => s !== (+id));
    }
    this.loadProducts(this.criteria);

  }

  setCollectionFilter(event, id: string) {
    this.criteria.collection = id;
    this.loadProducts(this.criteria);

  }

  setPriceFilter(event, value: string) {
    console.log('event', event);
    console.log('id', value);

  }

  calculateNewPrice(price: number, percentage: number) {
    return price - ((price * percentage) / 100);

  }
}
