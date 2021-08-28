import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import Category from '../../models/Category';
import SubCategory from '../../models/SubCategory';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, AfterViewInit {


  selectedSizes: string[] = [];
  shoesSizes: string[] = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47'];
  clothesSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  loadedCategories: Category[] = [{id: 7, name: 'cat1', subCategory: [{id: 2, name: 'sub1'}, {id: 3, name: 'sub2'}]}, {
    id: 8,
    name: 'cat2',
    subCategory: [{id: 4, name: 'sub3'}, {id: 5, name: 'sub4'}]
  }];
  loadedSubcategories: SubCategory[] = [];
  productFormGroup: FormGroup;
  selectedCategory: Category;
  image1: string | ArrayBuffer;
  image2: string | ArrayBuffer;
  image3: string | ArrayBuffer;
  image4: string | ArrayBuffer;
  image5: string | ArrayBuffer;
  mainImageDisplay: string | ArrayBuffer;


  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    //   this.loadCategories();
    this.productFormValidate();
  }

  ngAfterViewInit(): void {
    this.loadScript('assets/js/touchspin/vendors.min.js');
    this.loadScript('assets/js/touchspin/touchspin.js');
    this.loadScript('assets/js/touchspin/input-groups.min.js');


  }

  public loadScript(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementById('body').appendChild(node);


  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.loadedCategories = categories;

    });

  }

  setCategoriesAttributes(event) {
    const catName = event.value;
    this.loadedSubcategories = this.loadedCategories.filter(cat => cat.name === catName)[0].subCategory;
    console.log(this.loadedSubcategories);
    this.selectedSizes = catName === 'cat1' ? this.shoesSizes : this.clothesSizes;
    this.loadScript('assets/js/touchspin/vendors.min.js');
    this.loadScript('assets/js/touchspin/touchspin.js');
    this.loadScript('assets/js/touchspin/input-groups.min.js');


  }

  displayImageToUpload(id: number, event) {

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.mainImageDisplay = reader.result;
      switch (id) {
        case 1:
          this.image1 = reader.result;
          break;
        case 2:
          this.image2 = reader.result;
          break;
        case 3:
          this.image3 = reader.result;
          break;
        case 4:
          this.image4 = reader.result;
          break;
        case 5:
          this.image5 = reader.result;
          break;
      }
    };


  }


  private productFormValidate() {
    this.productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      collection: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', Validators.required],
      size: this.formBuilder.array(this.shoesSizes)
    });
  }
  get sizes(): FormArray {
    return this.productFormGroup.get('size') as FormArray;
  }



  addProduct() {
    console.log(this.productFormGroup.value);

  }
}
