import { Blog } from './blog.model';

export class Page {
  content: Blog[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: string;
  size: number;
  sort: {sorted: boolean, unsorted: boolean, empty: boolean};
  totalElements: number;
  totalPages: number;
}
