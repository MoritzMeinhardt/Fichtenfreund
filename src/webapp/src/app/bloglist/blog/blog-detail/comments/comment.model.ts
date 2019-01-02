

export class CommentModel implements IComment{
  name: string;
  email: string;
  commentText: string;
  created: number;

  constructor (name: string, email: string, commentText: string) {
    this.name = name;
    this.email= email;
    this.commentText = commentText;
    this.created = Date.now();
  }

}

export interface IComment {
  name: string,
  email: string,
  commentText: string,
  created: number
}
