import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NoticePagination } from '../Models/notice-pagination.model';
import { Notice } from '../Models/notice.model';
import { NoticeService } from '../Services/notice.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  _noticePagination: NoticePagination = new NoticePagination();
  _currentPage = 0;

  constructor(
    private _noticeService: NoticeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.currentPage = 0;
  }

  get noticePagination(): NoticePagination {
    return this._noticePagination;
  }

  set currentPage(page: number) {
    this._currentPage = page;
    this._noticeService.listAll(this._currentPage).subscribe(
      (noticePagination) => this._noticePagination = noticePagination,
      (error) => {
        alert('It was not possible to load Notice list. Please try again later!');
        console.log(error);
      }
    );
  }

  get currentPage(): number {
    return this._currentPage;
  }

  nextPage(): void {
    this.currentPage++;
  }

  previousPage(): void {
    this.currentPage--;
  }
}
