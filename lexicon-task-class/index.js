import { assignRandomSubjectAndDisplayTeachers, displayAllStudents, displayAllStudentsEnlistedToSubject, displayAllSubjectsOfStudent } from './utils.js';

import School from './School.js';
import Student from './Student.js';
import Subject from './Subject.js';

const school = new School('Coderschool', '37T Le Quy Don, Quan 3', '12345', 'TP HCM');

const math = new Subject('Math', [], []);
const physics = new Subject('Physics', [], []);
const english = new Subject('English', [], []);

const students = [
  new Student('Alice', 20),
  new Student('Bob', 21),
  new Student('Carol', 22),
  new Student('David', 23),
  new Student('Eva', 24),
];

const john = new Student('John');
const mary = new Student('Mary');

school.teachers.push(john, mary);

displayAllStudents(students);
displayAllSubjectsOfStudent(students, 'Alice'); // One student name
displayAllStudentsEnlistedToSubject(students, math);
displayAllStudentsEnlistedToSubject(students, physics);
displayAllStudentsEnlistedToSubject(students, english);

assignRandomSubjectAndDisplayTeachers(school, [math, physics, english]);

















// OLD CODE

// class School {
//   constructor(name, address, zipcode, city) {
//     this.name = name;
//     this.address = address;
//     this.zipcode = zipcode;
//     this.city = city;
//     this.students = [];
//     this.teachers = [];
//   }
// }

// class Subject {
//   constructor(subject, students, teachers) {
//     this.subject = subject;
//     this.students = students;
//     this.teachers = teachers;
//   }

//   addTeacher(teacher) {
//     this.teachers.push(teacher);
//   }

//   addStudent(student) {
//     this.students.push(student);
//     student.addSubject(this);
//   }
// }

// class Student {
//   constructor(name, age, gender) {
//     this.name = name;
//     this.age = age;
//     this.subjects = [];
//   }

//   addSubject(subject) {
//     this.subjects.push(subject);
//   }
// }

// const school = new School('Coderschool', '37T Le Quy Don, Quan 3', '12345', 'TP HCM');

// const math = new Subject('Math', [], []);
// const physics = new Subject('Physics', [], []);
// const english = new Subject('English', [], []);




// const students = [
//   new Student('Alice', 20),
//   new Student('Bob', 21),
//   new Student('Carol', 22),
//   new Student('David', 23),
//   new Student('Eva', 24),
// ];

// const john = new Student('John');
// const mary = new Student('Mary');

// school.teachers.push(john, mary);




// function displayAllStudents() {
//   for (const student of students) {
//     console.log(`Students in ${subject}: `);
//     const studentsInSubject = students.filter(student => student.subjects.includes(subject));
//     for (const student of studentsInSubject) {
//       console.log(student.name);
//     }
//   }
// }

// displayAllStudents();

// function displayAllSubjectsOfStudent(studentName) {
//   let student = students.find(student => student.name === studentName);

//   if (student && student.subjects) {
//     console.log(`${student.name}'s subjects:`);
//     for (let i = 0; i < student.subjects.length; i++) {
//       console.log(student.subjects[i]);
//     }
//   } else {
//     console.log('Invalid student name');
//   }
// }

// displayAllSubjectsOfStudent('Eva');

// function displayAllStudentsEnlistedToSubject(subject) {
//   console.log(`Students enlisted in ${subject}: `);
//   const enlistedStudents = students.filter(student => student.subjects.includes(subject));
//   for (const student of enlistedStudents) {
//     console.log(student.name);
//   }
// }

// displayAllStudentsEnlistedToSubject('math');
// displayAllStudentsEnlistedToSubject('physics');
// displayAllStudentsEnlistedToSubject('english');

// const subjects = [math, physics, english];

// function assignRandomSubjectAndDisplayTeachers() {
//   console.log('Teachers:');
//   const subjectsCopy = [...subjects]; // create a copy of the subjects array
//   for (const teacher of school.teachers) {
//     if (subjectsCopy.length === 0) {
//       console.log('No more subjects to assign.');
//       break;
//     }
//     const randomIndex = Math.floor(Math.random() * subjectsCopy.length);
//     const randomSubject = subjectsCopy[randomIndex];
//     randomSubject.addTeacher(teacher);
//     console.log(`${teacher.name} teaches ${randomSubject.subject}`);
//     subjectsCopy.splice(randomIndex, 1); // remove the assigned subject from the list
//   }
// }

// assignRandomSubjectAndDisplayTeachers();