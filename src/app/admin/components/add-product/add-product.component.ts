import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import Category from '../../models/Category';
import Product, {Size} from '../../models/Product';
import {ToastrService} from 'ngx-toastr';
import {FileStorageService} from '../../services/file-storage.service';
import Image from '../../models/Picture';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, AfterViewInit {

  sizesToPersist: Size[] = [];
  selectedSizes: Size[] = [];
  shoesSizes: Size[] = [];
  clothesSizes: Size[] = [];
  loadedCategories: Category[] = [];
  loadedCollections: string[] = [];
  loadedGenders: string[] = [];
  productFormGroup: FormGroup;
  selectedCategory: Category;
  /* ---------- images ----------- */
  image1Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  image2Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  image3Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  image4Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  image5Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  mainImageDisplay: string | ArrayBuffer;
  imagesToPersist: Image[] = [];

  /* ----- ng select ------ */
  CategoryDropdownSettings: any = {};
  ShowFilter = false;


  constructor(private categoryService: CategoryService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private fileStorageService: FileStorageService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadCategories();
    this.productFormValidate();
  }

  ngAfterViewInit(): void {
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
    /* const catName = event.value;
     this.loadedSubcategories = this.loadedCategories.filter(cat => cat.name === catName)[0].subCategory;
     console.log(this.loadedSubcategories);
     this.selectedSizes = catName === 'cat1' ? this.shoesSizes : this.clothesSizes;
     console.log(this.selectedSizes);
 */

  }

  uploadImage(id: number, event) {
    switch (id) {
      case 1:
        this.image1Preview.uploading = true;
        this.image1Preview.uploaded = false;
        break;
      case 2:
        this.image2Preview.uploading = true;
        this.image2Preview.uploaded = false;
        break;
      case 3:
        this.image3Preview.uploading = true;
        this.image3Preview.uploaded = false;
        break;
      case 4:
        this.image4Preview.uploading = true;
        this.image4Preview.uploaded = false;
        break;
      case 5:
        this.image5Preview.uploading = true;
        this.image5Preview.uploaded = false;
        break;
    }
    const file = event.target.files[0];
    this.fileStorageService.upload(file).subscribe(value => {
      const index = this.imagesToPersist.findIndex(x => x.id === id);
      if (index > -1) {
        this.imagesToPersist[index].name = value.fileName;
      } else {

        this.imagesToPersist.push({id, name: value.fileName});

      }
      this.previewImageImage(id, file);

    });

  }


  private productFormValidate() {

    // init subcategory dropdown
    this.CategoryDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    // init t-shirts sizes
    this.clothesSizes = [{name: 'XS'}, {name: 'S'}, {name: 'M'}, {name: 'L'}, {name: 'XL'}, {name: 'XXL'}, {name: '3XL'}];
    this.clothesSizes.map(c => c.quantity = 0);

    // init collections
    this.loadedCollections = ['Summer', 'Winter'];

    // init genders
    this.loadedGenders = ['Men', 'Women', 'Unisex'];


    this.productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      gender: [this.loadedGenders[0], Validators.required],
      collection: [this.loadedCollections[0], Validators.required],
      price: [0, Validators.min(1)],
      category: ['', Validators.required],
      description: ['', Validators.required],
      drop: [false, Validators.required],
    });
  }


  addProduct() {
    if (!this.productFormGroup.valid) {
      return;
    } else {
      // get formGroup values
      const product = this.productFormGroup.value as Product;
      // map sizes
      this.sizesToPersist = this.sizesToPersist.filter(s => s.quantity !== 0);
      product.sizes = this.sizesToPersist;

      // map images
      product.pictures = [];
      this.imagesToPersist.forEach(img => {
        product.pictures.push({name: img.name});
      });
      this.productService.addProduct(product).subscribe(rep => {
        if (rep) {
          this.showToast('SUCCESS', 'Product Added', 'Your product has been added successfully');
        }
      });

    }

  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  updateSizes(s: Size, value: string) {
    this.sizesToPersist = [];
    const itemIndex = this.sizesToPersist.findIndex(item => item.name === s.name);
    if (itemIndex > -1) {
      this.sizesToPersist[itemIndex].quantity = +value;
    } else {

      this.sizesToPersist.push({name: s.name, quantity: +value});
    }
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

  private previewImageImage(id: number, file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.mainImageDisplay = reader.result;
      switch (id) {
        case 1:
          this.image1Preview.src = reader.result;
          this.image1Preview.uploading = false;
          this.image1Preview.uploaded = true;
          break;
        case 2:
          this.image2Preview.src = reader.result;
          this.image2Preview.uploading = false;
          this.image2Preview.uploaded = true;
          break;
        case 3:
          this.image3Preview.src = reader.result;
          this.image3Preview.uploading = false;
          this.image3Preview.uploaded = true;
          break;
        case 4:
          this.image4Preview.src = reader.result;
          this.image4Preview.uploading = false;
          this.image4Preview.uploaded = true;
          break;
        case 5:
          this.image5Preview.src = reader.result;
          this.image5Preview.uploading = false;
          this.image5Preview.uploaded = true;
          break;
      }
    };

  }
}
