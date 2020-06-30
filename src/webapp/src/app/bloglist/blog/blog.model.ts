import {IComment} from './blog-detail/comments/comment.model';

export class Blog {

  id: string;
  title: string;
  titlePicture: number;
  date: Date;
  category: string;
  paragraphs: IParagraph[];
  comments: IComment[];
  galleryImages: IGalleryImage[];
  updated_on: Date;

  constructor (title: string, titlePicture: number, date: Date, category: string,
               paragraphs: IParagraph[], comments: IComment[], galleryImages: IGalleryImage[]) {
    this.title = title;
    this.titlePicture = titlePicture;
    this.date = date;
    this.category = category;
    this.paragraphs = paragraphs;
    this.comments = comments;
    this.galleryImages = galleryImages;
  }

}

export interface IParagraph {
  paragraphPic: string;
  paragraphTitle: string;
  paragraphText: string;
}

export interface IGalleryImage {
  id: number;
  title: string;
  altText: string;
  createdOn: Date;
}

