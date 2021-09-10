import {Component, Input, OnInit} from '@angular/core';
import Product from '../../models/Product';
import {NgbActiveModal, NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Sale from '../../models/Sale';
import {SaleService} from '../../services/sale.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {
  @Input()
  product: Product;
  saleFormGroup: FormGroup;
  submittingData = false;

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder,
              private saleService: SaleService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.saleFormGroupValidate();
  }

  closeModal(c?: any) {
    this.activeModal.close(c);
  }

  private saleFormGroupValidate() {
    this.saleFormGroup = this.formBuilder.group({
      percentage: [0, Validators.min(1)],
      product: this.product,
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, {validator: this.checkDates});
  }

  addSale() {
    if (!this.saleFormGroup.valid) {
      return;
    } else {
      const sale = this.saleFormGroup.value as Sale;
      this.saleService.addSale(this.product.id, sale).subscribe(s => {
        this.showToast('SUCCESS', 'Promotion ajoutée', 'La promotion a été ajoutée avec success! ');
        this.saleFormGroup.reset();
        this.closeModal(undefined);
        this.submittingData = false;

      }, error => {
        this.submittingData = false;
        this.showToast('ERROR', 'Categorie non ajoutée', 'Une erreur serveur s\'est produite');
      });
    }

  }

  checkDates(group: FormGroup) {
    if (group.controls.endDate.value < group.controls.startDate.value) {
      return {notValid: true};
    }
    return null;
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

}
