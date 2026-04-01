// librarySystem.js
import Book from './book.js';
import BorrowTransaction from './borrowTransaction.js';
import NotificationService from '.notificationService.js';

class LibrarySystem {
  constructor() {
    if (LibrarySystem.instance) return LibrarySystem.instance;

    this.users = [];
    this.books = [];
    this.transactions = [];
    this.notificationService = new NotificationService();

    LibrarySystem.instance = this;
  }

  // User management
  addUser(user) {
    this.users.push(user);
    this.notificationService.register(user);
  }

  // Book management
  addBook(book) {
    this.books.push(book);
  }

  // Borrowing
  borrowBook(userId, bookId) {
    const user = this.users.find(u => u.id === userId);
    const book = this.books.find(b => b.id === bookId);

    if (!user || !book) {
      console.log("User or Book not found");
      return;
    }

    if (book.isBorrowed) {
      console.log(`Book '${book.title}' is already borrowed`);
      return;
    }

    book.isBorrowed = true;
    const transaction = new BorrowTransaction(user, book);
    this.transactions.push(transaction);
    console.log(`${user.name} borrowed '${book.title}'`);
  }

  returnBook(bookId) {
    const transaction = this.transactions.find(t => t.book.id === bookId && !t.isReturned);
    if (transaction) {
      transaction.isReturned = true;
      transaction.book.isBorrowed = false;
      console.log(`${transaction.user.name} returned '${transaction.book.title}'`);
    } else {
      console.log("Transaction not found");
    }
  }

  viewBorrowedBooks() {
    const borrowed = this.transactions
      .filter(t => !t.isReturned)
      .map(t => t.book.title);
    console.log("Borrowed Books:", borrowed);
  }

  simulateOverdue(bookId) {
    const transaction = this.transactions.find(t => t.book.id === bookId);
    if (transaction) {
      transaction.overdue = true;
      this.notificationService.notifyOverdue(transaction);
    }
  }
}

export default new LibrarySystem(); // Singleton instance