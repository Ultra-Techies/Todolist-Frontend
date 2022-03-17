import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
})
export class AddtaskComponent implements OnInit {
  public addtaskForm!: FormGroup;
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private modalService: MdbModalService
  ) {}
  ngOnInit(): void {
    this.addtaskForm = this.formBuilder.group({
      task: [''],
      duedate: [''],
      description: [''],
    });
  }
  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {});
    this.modalRef.onClose.subscribe((message: any) => {
      this.router.navigate(['todo']);
      console.log(message);
    });
  }

  showToastMessage(message: string = 'null', isError: boolean = false) {
    //if error is true then show error toast else show success toast
    if (isError) {
      this.toastr.error(message, 'Error');
    }
    this.toastr.success(message, 'Success');
  }
}
