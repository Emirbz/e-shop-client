import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Size from '../../models/Size';
import Category from '../../models/Category';
import {SizeService} from '../../services/size.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-size',
  templateUrl: './edit-size.component.html',
  styleUrls: ['./edit-size.component.scss']
})
export class EditSizeComponent implements OnInit {

  @Input()
  sizeToEdit: Category;


  sizeFormGroup: FormGroup;


  submittingData = false;

  constructor(private  sizeService: SizeService, private toastr: ToastrService, private formBuilder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.sizeFormGroupValidation();
    this.patchValues();
  }


  updateSize() {
    this.submittingData = true;
    const updatedSize = this.sizeFormGroup.value as Size;
    updatedSize.id = this.sizeToEdit.id;
    this.sizeService.updateSize(updatedSize).subscribe(s => {

      this.showToast('SUCCESS', 'Taille modifée', 'La taille a été modifée avec success! ');
      this.sizeToEdit = {};
      this.sizeFormGroup.reset();
      this.submittingData = false;
      this.closeModal(s);
    }, error => {
      this.submittingData = false;
      this.showToast('ERROR', 'Taille non ajoutée', 'Une erreur serveur s\'est produite');

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

  sizeFormGroupValidation() {
    this.sizeFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      picture: ['', Validators.required],

    });
  }

  private patchValues() {
    this.sizeFormGroup.patchValue({
      name: this.sizeToEdit.name
    });

  }


  closeModal(c?: any) {
    this.activeModal.close(c);
  }

}
