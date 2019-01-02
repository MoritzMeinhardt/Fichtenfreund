import {IComment} from "./blog-detail/comments/comment.model";

export class Blog {

  _id: string;
  title: string;
  titlePicture: string;
  date: Date;
  category: string;
  paragraphs: IParagraph[];
  comments: IComment[];

  constructor (title: string, titlePicture: string, date: Date, category: string, paragraphs: IParagraph[], comments: IComment[]) {
    this.title = title;
    this.titlePicture = titlePicture;
    this.date = date;
    this.category = category;
    this.paragraphs = paragraphs;
    this.comments = comments;
  }

}

export interface IParagraph {
  paragraphPic: string,
  paragraphTitle: string,
  paragraphText: string,
}


