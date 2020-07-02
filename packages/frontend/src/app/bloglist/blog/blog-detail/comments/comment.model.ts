export interface IComment {
  name: string;
  commentText: string;
  createdOn: number;
}

export class CommentModel implements IComment {
  name: string;
  email: string;
  commentText: string;
  createdOn: number;

  constructor (name: string, email: string, commentText: string) {
    this.name = name;
    this.commentText = commentText;
    this.createdOn = Date.now();
  }

}

