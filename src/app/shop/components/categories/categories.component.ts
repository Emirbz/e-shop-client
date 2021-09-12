import {Component, OnInit} from '@angular/core';
import Category from '../../../admin/models/Category';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../../admin/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  loadedCategories: Category[] = [];
  categoriesHasBeenLoaded = false;

  constructor(private toastr: ToastrService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  showToast(type: 'ERROR' | 'SUCCESS', title: string, message: string) {
    switch (type) {
      case 'ERROR':
        this.toastr.error(message, title, {
          progressBar: true,
          progressAnimation: 'decreasing'
        });
        break;
      case 'SUCCESS':
        this.toastr.success(message, title, {
          progressBar: true,
          progressAnimation: 'decreasing'
        });
        break;
    }
  }


  private loadCategories() {
    this.categoryService.getCategories().subscribe(c => {
      this.loadedCategories = c;
      this.categoriesHasBeenLoaded = true;
    }, error => {
      this.showToast('ERROR', 'Liste categories not chargée', 'Une erreur s\'est produite');
      this.categoriesHasBeenLoaded = true;
    });

  }

}
