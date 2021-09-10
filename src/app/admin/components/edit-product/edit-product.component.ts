import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink} from '@angular/router';
import Product, {ProductSize} from '../../models/Product';
import Image from '../../models/Picture';
import {FileStorageService} from '../../services/file-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Size from '../../models/Size';
import Category from '../../models/Category';
import {CategoryService} from '../../services/category.service';
import {SizeService} from '../../services/size.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  sizesToPersist: ProductSize[] = [];
  loadedSizes: Size[] = [];
  loadedStatus: string[] = [];
  loadedProduct: Product;
  loadedCategories: Category[] = [];
  loadedCollections: string[] = [];
  loadedGenders: string[] = [];
  selectedCategory: Category;
  /* ---------- images ----------- */
  image1Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  image2Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  image3Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  image4Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  image5Preview: { src: string | ArrayBuffer, uploading: boolean, uploaded: boolean } = {src: '', uploading: false, uploaded: false};
  mainImageDisplay: string | ArrayBuffer;
  imagesToPersist: Image[] = [];

  /* --- formGroup ---- */
  productFormGroup: FormGroup;

  /* ----- ng select ------ */
  CategoryDropdownSettings: any = {};
  ShowFilter = false;


  constructor(private productService: ProductService,
              private router: ActivatedRoute,
              private routerLink: Router,
              private fileStorageService: FileStorageService,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private sizeService: SizeService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadSizes();
    this.loadCategories();
    this.loadSingleProduct();
  }


  private loadSingleProduct() {
    const id = this.router.snapshot.params.id;
    this.productService.getSingleProduct(id).subscribe(p => {
      if (p) {

        this.productFormValidate(p);
        this.loadedProduct = p;
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.loadedCategories = categories;
    });

  }

  private loadSizes() {
    this.sizeService.getSizes().subscribe(s => {
      this.loadedSizes = s;
    });
  }

  private productFormValidate(p: Product) {

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

    // init collections
    this.loadedCollections = ['Été', 'Hiver', 'Printemps', 'Automne'];

    // init genders
    this.loadedGenders = ['Homme', 'Femme', 'Unisexe'];

    // init status
    this.loadedStatus = ['Disponible', 'Hors stock'];


    this.productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      collection: ['', Validators.required],
      price: [0, Validators.min(1)],
      categories: ['', Validators.required],
      description: ['', Validators.required],
      drop: [false, Validators.required],
      status: ['', Validators.required],
    });
    this.productFormGroup.patchValue({
      name: p.name,
      gender: this.loadedGenders[this.fillGender(p)],
      collection: this.loadedCollections[this.fillCollection(p)],
      price: p?.price,
      categories: p?.categories,
      description: p.description,
      drop: true,
      status: this.loadedStatus[this.fillStatus(p)],

    });

    // display image;
    this.mainImageDisplay = p?.pictures[0].url;
    p?.pictures.forEach((pic, i) => {
      if (pic.url) {
        this.getPictureIndex(i).src = p?.pictures[i].url;
        this.getPictureIndex(i).src = p?.pictures[i].url;
        this.getPictureIndex(i).uploaded = true;
        this.imagesToPersist.push({id: i + 1, name: pic.name});

      }

    });
    // set sizes values
    this.sizesToPersist = p.sizes;

  }

  getPictureIndex(i: number) {
    switch (i) {
      case 0:
        return this.image1Preview;
      case 1:
        return this.image2Preview;
      case 2:
        return this.image3Preview;
      case 3:
        return this.image4Preview;
      case 4:
        return this.image5Preview;

    }
  }

  fillCategories() {

  }

  fillGender(p: Product) {
    return this.loadedGenders.findIndex(g => g === p.gender);
  }

  fillCollection(p: Product) {
    return this.loadedCollections.findIndex(g => g === p.collection);
  }

  fillStatus(p: Product) {
    return this.loadedStatus.findIndex(g => g === p.status);
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

  updateSizes(s: Size, value: string) {
    const itemIndex = this.sizesToPersist.findIndex(item => item.size.name === s.name);
    if (itemIndex > -1) {
      this.sizesToPersist[itemIndex].quantity = +value;
    } else {

      this.sizesToPersist.push({size: {name: s.name, id: s.id}, quantity: +value});
    }
  }

  editProduct() {
    const id = this.router.snapshot.params.id;
    if (!this.productFormGroup.valid) {

      return;
    } else {
      // get formGroup values
      const product = this.productFormGroup.value as Product;
      // map sizes
      this.sizesToPersist = this.sizesToPersist.filter(s => s.quantity !== 0);
      product.sizes = this.sizesToPersist;

      // map images
      {
        product.pictures = [];
      }
      this.imagesToPersist.forEach(img => {
        product.pictures.push({name: img.name});
      });
      this.productService.updateProduct(id, product).subscribe(rep => {
        if (rep) {
          this.showToast('SUCCESS', 'Product modifié', 'Votre produit a été modifié avec succès');
          this.routerLink.navigate(['/admin/products/list']);
        }
      }, error => {
        this.showToast('ERROR', 'Produit non ajouté', 'Une erreur s\'est produite');

      });


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

  getSizeValue(name: string) {
    const quantity = this.loadedProduct?.sizes.find(s => s.size.name === name)?.quantity;
    if (quantity > 0) {
      return quantity;
    } else {
      return 0;
    }

  }
}


