import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Notice } from '../Models/notice.model';
import { NoticePagination } from '../Models/notice-pagination.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private apiPath = 'http://localhost:8080/notice';

  constructor(private http: HttpClient) { }

  listAll(page: number): Observable<NoticePagination>{
    return this.http.get(`${this.apiPath}?page=${page}`).pipe(
      catchError(this.handleError),
      map(this.jsonDataToNoticePagination)
    );
  }

  findById(noticeId: number): Observable<Notice> {
    const url = `${this.apiPath}/${noticeId}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToNotice)
    );
  }

  create(notice: Notice): Observable<Notice>{
    return this.http.post(this.apiPath, notice).pipe(
      catchError(this.handleError),
      map(this.jsonDataToNotice)
    );
  }

  update(noticeId: number, notice: Notice): Observable<Notice>{
    const url = `${this.apiPath}/${noticeId}`;

    return this.http.put(url, notice).pipe(
      catchError(this.handleError),
      map(() => notice)
    );
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonDataToNoticePagination(jsonData: any): NoticePagination {
    const pagination: NoticePagination = new NoticePagination();

    pagination.offset = jsonData.pageable.offset;
    pagination.pageSize = jsonData.pageable.pageSize;
    pagination.currentPage = jsonData.pageable.pageNumber;
    pagination.totalElements = jsonData.totalElements;
    pagination.totalPages = jsonData.totalPages;
    jsonData.content.forEach((element: Notice) => {
      const notice = {
        ...element,
        publicationDate: new Date(element.publicationDate?.toString() + 'Z'),
        viewDate: element.viewDate ? new Date(element.viewDate.toString() + 'Z') : null,
      };
      pagination.notices.push(notice as Notice);
    });

    return pagination;
  }

  private jsonDataToNotice(jsonData: any): Notice {
    const notice = {
      ...jsonData as Notice,
      publicationDate: (jsonData as Notice).publicationDate ? new Date((jsonData as Notice).publicationDate?.toString() + 'Z') :  null,
      viewDate: (jsonData as Notice).viewDate ? new Date((jsonData as Notice).viewDate.toString() + 'Z') : null,
    };
    return notice as Notice;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
