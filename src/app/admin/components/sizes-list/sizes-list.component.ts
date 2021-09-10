import {AfterViewInit, Component, OnInit} from '@angular/core';
import Size from '../../models/Size';
import {SizeService} from '../../services/size.service';
import Category from '../../models/Category';
import {DeleteConfirmationComponent} from '../../modals/delete-confirmation/delete-confirmation.component';
import {EditSizeComponent} from '../../modals/edit-size/edit-size.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddSizeComponent} from '../../modals/add-size/add-size.component';

@Component({
  selector: 'app-sizes-list',
  templateUrl: './sizes-list.component.html',
  styleUrls: ['./sizes-list.component.scss']
})
export class SizesListComponent implements OnInit, AfterViewInit {
  loadedSizes: Size[] = [];
  sizeToDelete: Size = {};
  sizeToEdit: Size = {};
   sizesHasBeenLoaded = false;

  constructor(private sizeService: SizeService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadSizes();
  }

  ngAfterViewInit(): void {
    this.loadScript('assets/js/datatables/jquery.dataTables.min.js');
    this.loadScript('assets/js/datatables/custom-basic.js');


  }

  public loadScript(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementById('body').appendChild(node);


  }

  private loadSizes() {
    this.sizeService.getSizes().subscribe(c => {
      this.loadedSizes = c;
      this.sizesHasBeenLoaded = true;
      this.initDataTable();
    }, error => {
      this.sizesHasBeenLoaded = true;
    });
  }

  removeSize(c: Size) {
    const indexToRemove = this.loadedSizes.map(item => item.id).indexOf(c.id);
    this.loadedSizes.splice(indexToRemove, 1);
  }

  openModalEditSize(s: Size) {
    const modalRef = this.modalService.open(
      EditSizeComponent
    );
    modalRef.result.then((size) => {
      if (size !== undefined) {
        this.updateSizes(size);
      }

    });
    modalRef.componentInstance.sizeToEdit = s;

  }

  private updateSizes(s: Size) {
    const indexToRemove = this.loadedSizes.map(item => item.id).indexOf(s.id);
    this.loadedSizes[indexToRemove] = s;
  }


  openModalDeleteSize(s: Size) {
    const modalRef = this.modalService.open(
      DeleteConfirmationComponent
    );
    modalRef.result.then((size) => {
      if (size !== undefined) {
        this.removeSize(size);
      }

    });
    modalRef.componentInstance.type = 'Taille';
    modalRef.componentInstance.id = s.id;

  }

  openModalAddSize() {
    const modalRef = this.modalService.open(
      AddSizeComponent
    );
    modalRef.result.then((size) => {
      if (size !== undefined) {
        this.loadedSizes.push(size);
      }

    });
  }



  private initDataTable() {
    setTimeout(() => { // @ts-ignore
      $('#sizes_list').DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
        }
      });
    }, 100);

  }
}
