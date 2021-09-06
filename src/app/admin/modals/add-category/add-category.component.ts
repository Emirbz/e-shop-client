import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Category from '../../models/Category';
import {CategoryService} from '../../services/category.service';
import Picture from '../../models/Picture';
import {FileStorageService} from '../../services/file-storage.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  imageToPersist: Picture = {};
  categoryFormGroup: FormGroup;
  submittingData = false;

  constructor(private  categoryService: CategoryService, private formBuilder: FormBuilder,
              private fileStorageService: FileStorageService, private toastr: ToastrService,private activeModal:NgbActiveModal) {
  }

  ngOnInit(): void {
    this.categoryFormGroupValidation();
  }


  addCategory() {
    this.submittingData = true;
    if (!this.categoryFormGroup.valid) {
      this.submittingData = false;
      return;
    } else {
      const category = this.categoryFormGroup.value as Category;
      category.picture = this.imageToPersist;
      this.categoryService.addCategory(category).subscribe(cat => {
        this.showToast('SUCCESS', 'Categorie ajoutée', 'La catégorie a été ajoutée avec success! ');
        this.categoryFormGroup.reset();
        this.closeModal(cat);
        this.submittingData = false;

      }, error => {
        this.submittingData = false;
        this.showToast('ERROR', 'Categorie non ajoutée', 'Une erreur serveur s\'est produite');
      });


    }
  }


  categoryFormGroupValidation() {
    this.categoryFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      picture: ['', Validators.required],

    });
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

  closeModal(c?: any) {
    this.activeModal.close(c);
  }
}
