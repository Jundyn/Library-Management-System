// user.js
class User {
  constructor(id, name) {
    if (new.target === User) {
      throw new Error("Cannot instantiate abstract class User");
    }
    this.id = id;
    this.name = name;
  }

  getRole() {
    throw new Error("getRole() must be implemented by subclass");
  }
}

class Student extends User {
  getRole() {
    return "Student";
  }
}

class Teacher extends User {
  getRole() {
    return "Teacher";
  }
}

// Factory Pattern
class UserFactory {
  static createUser(type, id, name) {
    switch(type.toLowerCase()) {
      case "student": return new Student(id, name);
      case "teacher": return new Teacher(id, name);
      default: throw new Error("Unknown user type");
    }
  }
}

export { User, Student, Teacher, UserFactory };