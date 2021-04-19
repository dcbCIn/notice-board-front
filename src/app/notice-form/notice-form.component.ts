import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Notice } from '../Models/notice.model';
import { NoticeService } from '../Services/notice.service';

@Component({
  selector: 'app-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.css']
})
export class NoticeFormComponent implements OnInit, AfterContentChecked {

  noticeForm: FormGroup;
  submittingForm = false;
  currentAction?: string;
  notice: Notice;
  pageTitle?: string;

  constructor(
    private _noticeService: NoticeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.notice = new Notice();
    this.setCurrentAction();
  }

  ngAfterContentChecked(): void{
    this.updatePageTitle();
  }

  private setCurrentAction(): void{
    if (this.route.snapshot.url[1].path === 'new'){
      this.currentAction = 'new';
    }else if (this.route.snapshot.url[2].path === 'view'){
      this.currentAction = 'view';
      this.loadNotice();
    }else{
      this.currentAction = 'edit';
      this.loadNotice();
    }
  }

  submitForm(noticeForm: NgForm): void {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createNotice(noticeForm);
    }else if (this.currentAction === 'edit') {
      this.updateNotice(noticeForm);
    }
  }

   private loadNotice(): void {
    if (['edit', 'view'].includes(this.currentAction)) {
      this.route.paramMap.pipe(
        switchMap(params => this._noticeService.findById(Number(params.get('id'))))
      )
      .subscribe(
        (notice) => {
          this.notice = notice;
          if (!this.notice.viewDate && this.currentAction === 'view'){
            this.notice.viewDate = new Date();
            this._noticeService.update(this.notice.id as number, this.notice)
            .subscribe(
              () => console.log('Successfully recorded viewDate.'),
              error => this.recordingError(error)
            );
          }
        },
        (error) => alert('Error trying to load Notice. Please try again later!')
      );
    }
  }

  private createNotice(noticeForm: any): void {
    const notice: Notice = Object.assign(new Notice(), noticeForm.value);

    this._noticeService.create(notice)
    .subscribe(
      () => this.successfullyRecorded(),
      error => this.recordingError(error)
    );
  }

  private updateNotice(noticeForm: any): void {
    const notice: Notice = Object.assign(new Notice(), noticeForm.value);

    this._noticeService.update(notice.id as number, notice)
      .subscribe(
        () => this.successfullyRecorded(),
        error => this.recordingError(error)
      );
  }

  private successfullyRecorded(): void {
    this.router.navigateByUrl('notice');
  }

  private recordingError(error: any): void {
    alert(error.body.error);
  }

  private updatePageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = 'New Notice';
    }else if (this.currentAction === 'view') {
      this.pageTitle = 'View Notice: ' + this.notice.title;
    }else{
      this.pageTitle = 'Edit Notice: ' + this.notice.title;
    }
  }
}
