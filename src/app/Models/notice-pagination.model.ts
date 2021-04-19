import { Notice } from './notice.model';

export class NoticePagination {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  offset: number;
  notices: Notice[] = [];
}
