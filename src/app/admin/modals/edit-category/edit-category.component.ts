import {Component, Input, OnInit} from '@angular/core';
import Category from '../../models/Category';
import Picture from '../../models/Picture';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {FileStorageService} from '../../services/file-storage.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input()
  categoryToEdit: Category;
  imageToPersist: Picture = {};
  categoryFormGroup: FormGroup;
  @Input()
  loadedCategories: Category[];
  submittingData = false;


  constructor(private  categoryService: CategoryService, private formBuilder: FormBuilder,
              private fileStorageService: FileStorageService, private toastr: ToastrService, private  activeModal: NgbActiveModal) {
  }


  ngOnInit(): void {
    this.categoryFormGroupValidation();
    this.patchValues();


  }


  uploadImage(event) {
    this.imageToPersist = {};
    this.submittingData = true;
    const file = event.target.files[0];
    this.fileStorageService.upload(file).subscribe(value => {
      this.imageToPersist.name = value.fileName;
      this.submittingData = false;
    }, error => {
      this.showToast('ERROR', 'Image non soumis', 'Une erreur serveur s\'est produite');
      this.submittingData = false;
    });

  }


  categoryFormGroupValidation() {
    this.categoryFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      picture: ['', Validators.required],

    });
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

  cancelUpload() {
    this.imageToPersist = {};
    this.submittingData = false;
  }

  updateCategory() {
    this.submittingData = true;
    const updatedCategory = this.categoryFormGroup.value as Category;
    if (this.imageToPersist.name) {

      updatedCategory.picture = this.imageToPersist;
    } else {
      updatedCategory.picture = this.categoryToEdit.picture;
    }
    updatedCategory.id = this.categoryToEdit.id;
    this.categoryService.updateCategory(updatedCategory).subscribe(c => {
      this.showToast('SUCCESS', 'Categorie modifée', 'La catégorie a été modifée avec success! ');
      this.categoryToEdit = {};
      this.submittingData = false;
      this.closeModal(c);
    }, error => {
      this.submittingData = false;
      this.showToast('ERROR', 'Categorie non modifiée', 'Une erreur serveur s\'est produite');

    });
  }

  private patchValues() {
    this.categoryFormGroup.patchValue({
      name: this.categoryToEdit.name
    });
  }


  closeModal(c?: any) {
    this.activeModal.close(c);
  }
}
