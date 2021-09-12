import {Component, Input, OnInit} from '@angular/core';
import User from '../../models/User';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {
  @Input()
  user: User;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  closeModal(c?: any) {
    this.activeModal.close(c);
  }
}
