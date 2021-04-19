import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Notice } from '../Models/notice.model';
import { NoticeService } from '../Services/notice.service';

@Component({
  selector: 'app-notice-delete',
  templateUrl: './notice-delete.component.html',
  styleUrls: ['./notice-delete.component.css']
})
export class NoticeDeleteComponent implements OnInit {

  notice: Notice;

  constructor(
    private _noticeService: NoticeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.notice = new Notice();

    this.route.paramMap.pipe(
      switchMap(params => this._noticeService.findById(Number(params.get('id'))))
    )
    .subscribe(
      (notice) => {
        this.notice = notice;
      },
      (error) => {
        alert('It was not possible to load Notice. Please try again later!');
        console.log(error);
      }
    );
  }

  deleteNotice(): void {
    this._noticeService.delete(this.notice.id).subscribe(
      () => this.router.navigateByUrl('notice'),
      (error) => {
        alert('Error while trying to delete notice. Please try again later!');
        console.log(error);
      }
    );
  }
}
