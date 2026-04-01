// notificationService.js
class NotificationService {
  constructor() {
    this.subscribers = [];
  }

  register(user) {
    this.subscribers.push(user);
  }

  notifyOverdue(transaction) {
    this.subscribers.forEach(user => {
      if (user.id === transaction.user.id && transaction.overdue) {
        console.log(`Notification: ${user.name}, the book '${transaction.book.title}' is overdue!`);
      }
    });
  }
}

export default NotificationService;