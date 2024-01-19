export default class Student {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.subjects = [];
  }

  addSubject(subject) {
    this.subjects.push(subject);
  }
}