// borrowTransaction.js
class BorrowTransaction {
  constructor(user, book) {
    this.user = user;
    this.book = book;
    this.isReturned = false;
    this.overdue = false; // simulate overdue
  }
}

export default BorrowTransaction;