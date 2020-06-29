import {IComment} from './blog-detail/comments/comment.model';

export class Blog {

  _id: string;
  title: string;
  titlePicture: string;
  date: Date;
  category: string;
  paragraphs: IParagraph[];
  comments: IComment[];
  galleryImages: IGalleryImage[];
  updated_on: Date;

  constructor (title: string, titlePicture: string, date: Date, category: string,
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
  url: string;
  caption: string;
  description: string;
  date: Date;
}

