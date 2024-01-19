export default class Subject {
  constructor(subject, students, teachers) {
    this.subject = subject;
    this.students = students;
    this.teachers = teachers;
  }

  addTeacher(teacher) {
    this.teachers.push(teacher);
  }

  addStudent(student) {
    this.students.push(student);
    student.addSubject(this);
  }
}