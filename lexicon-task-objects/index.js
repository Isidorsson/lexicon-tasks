const school = {
  name: 'Coderschool',
  address: '37T Le Quy Don, Quan 3',
  zipcode: '12345',
  city: 'TP HCM',
  students: [],
  teachers: [],
}

const math = {
  subject: 'Math',
  students: [],
  teachers: [],
  addTeacher: function (teacher) {
    this.teachers.push(teacher);

  },
  addStudent: function (student) {
    this.students.push(student);
    student.addSubject(this)
  }

}

const physics = {
  subject: 'Physics',
  students: [],
  teachers: [],
  addTeacher: function (teacher) {
    this.teachers.push(teacher);
  },
  addStudent: function (student) {
    this.students.push(student);
    student.addSubject(this)
  }
}

const english = {
  subject: 'English',
  students: [],
  teachers: [],
  addTeacher: function (teacher) {
    this.teachers.push(teacher);
  },
  addStudent: function (student) {
    this.students.push(student);
    student.addSubject(this)
  }

}

const students = [
  {
    name: "Alice",
    age: 20,
    gender: "female",
    subjects: [],
    addSubject: function (subject) {
      this.subjects.push(subject);
    }
  },
  {
    name: "Bob",
    age: 21,
    gender: "male",
    subjects: [],
    addSubject: function (subject) {
      this.subjects.push(subject);
    }
  },
  {
    name: "Carol",
    age: 22,
    gender: "female",
    subjects: [],
    addSubject: function (subject) {
      this.subjects.push(subject);
    }
  },
  {
    name: "David",
    age: 23,
    gender: "male",
    subjects: [],
    addSubject: function (subject) {
      this.subjects.push(subject);

    }
  },
  {
    name: "Eva",
    age: 24,
    gender: "female",
    subjects: [],
    addSubject: function (subject) {
      this.subjects.push(subject);


    }
  },
];




const john = {
  name: 'John',
  subjects: [],
  addSubject: function (subject) {
    this.subjects.push(subject);
  },
}

const mary = {
  name: 'Mary',
  subjects: [],
  addSubject: function (subject) {
    this.subjects.push(subject);
  },
}

school.teachers.push(john,mary);

// john.subjects.push("math")
// console.log(john.subjects)

// john.addSubject("math")
// // Find Alice in the students array
// const alice = student.find((student) => {
//   return student.name === "Alice";
// });

// // Add math to Alice's subjects
// if (alice) {
//   alice.subjects.push("math");
// }

// console.log(alice.subjects);
// console.log(john.subjects)

// add mary and john to teachers array


for (let i = 0; i < students.length; i++) {
  let random = Math.floor(Math.random() * 3)
  if (random === 0) {
    john.addSubject(students[i])
  } else if (random === 1) {
    mary.addSubject(students[i])
  }
}

for (let i = 0; i < students.length; i++) {
  let random = Math.floor(Math.random() * subjects.length);
  students[i].subjects.push(subjects[random]);
}


function displayAllStudents() {
  for (const subject of subjects) {
    console.log(`Students in ${subject}: `);
    const studentsInSubject = students.filter(student => student.subjects.includes(subject));
    for (const student of studentsInSubject) {
      console.log(student.name);
    }
  }
}

displayAllStudents();

function displayAllSubjectsOfStudent(studentName) {
  let student = students.find(student => student.name === studentName);

  if (student && student.subjects) {
    console.log(`${student.name}'s subjects:`);
    for (let i = 0; i < student.subjects.length; i++) {
      console.log(student.subjects[i]);
    }
  } else {
    console.log('Invalid student name');
  }
}

displayAllSubjectsOfStudent('Eva');


function displayAllStudentsEnlistedToSubject(subject) {
  console.log(`Students enlisted in ${subject}: `);
  const enlistedStudents = students.filter(student => student.subjects.includes(subject));
  for (const student of enlistedStudents) {
    console.log(student.name);
  }
}
displayAllStudentsEnlistedToSubject('math');
displayAllStudentsEnlistedToSubject('physics');
displayAllStudentsEnlistedToSubject('english');

function displayAllTeachers() {
  console.log('Teachers:');
  for (const teacher of school.teachers) {
    console.log(teacher.name);
  }
}
displayAllTeachers();