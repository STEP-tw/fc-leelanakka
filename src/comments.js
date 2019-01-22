class Comment {
  constructor(comments) {
    this.comments = comments;
  }

  getComments() {
    return this.comments;
  }

  addComments(comment) {
    this.comments.unshift(comment);
  }

  commentsInString() {
    return JSON.stringify(this.comments);
  }
}

module.exports = Comment;
