export function displayAllStudents(students) {
  for (const student of students) {
    console.log(`Students in ${subject}: `);
    const studentsInSubject = students.filter(student => student.subjects.includes(subject));
    for (const student of studentsInSubject) {
      console.log(student.name);
    }
  }
}

export function displayAllSubjectsOfStudent(students, studentName) {
  const student = students.find(student => student.name === studentName);

  if (student && student.subjects) {
    console.log(`${student.name}'s subjects:`);
    for (const subject of student.subjects) {
      console.log(subject.subject);
    }
  } else {
    console.log('Invalid student name');
  }
}

export function displayAllStudentsEnlistedToSubject(students, subject) {
  console.log(`Students enlisted in ${subject}: `);
  const enlistedStudents = students.filter(student => student.subjects.includes(subject));
  for (const student of enlistedStudents) {
    console.log(student.name);
  }
}

export function assignRandomSubjectAndDisplayTeachers(school, subjects) {
  console.log('Teachers:');
  const subjectsCopy = [...subjects]; // create a copy of the subjects array
  for (const teacher of school.teachers) {
    if (subjectsCopy.length === 0) {
      console.log('No more subjects to assign.');
      break;
    }
    const randomIndex = Math.floor(Math.random() * subjectsCopy.length);
    const randomSubject = subjectsCopy[randomIndex];
    randomSubject.addTeacher(teacher);
    console.log(`${teacher.name} teaches ${randomSubject.subject}`);
    subjectsCopy.splice(randomIndex, 1); // remove the assigned subject from the list
  }
}