import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import Size from '../../models/Size';
import {SizeService} from '../../services/size.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.scss']
})
export class AddSizeComponent implements OnInit {
  sizeFormGroup: FormGroup;

  submittingData = false;

  constructor(private  sizeService: SizeService, private formBuilder: FormBuilder,
              private toastr: ToastrService, private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.sizeFormGroupValidation();
  }

  sizeFormGroupValidation() {
    this.sizeFormGroup = this.formBuilder.group({
      name: ['', Validators.required],

    });
  }

  addSize() {
    this.submittingData = true;
    if (!this.sizeFormGroup.valid) {
      this.submittingData = false;
      return;
    } else {
      const size = this.sizeFormGroup.value as Size;
      this.sizeService.addSize(size).subscribe(s => {
        this.showToast('SUCCESS', 'Taille ajoutée', 'La taille a été ajoutée avec success! ');
        this.sizeFormGroup.reset();
        this.submittingData = false;
        this.closeModal(s);

      }, error => {
        this.showToast('ERROR', 'Taille non ajoutée', 'Une erreur serveur s\'est produite');
        this.submittingData = false;
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

  closeModal(s?: Size) {
    this.activeModal.close(s);
  }
}
