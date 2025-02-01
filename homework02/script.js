let printStudents = (array, title) => {
  let contentDiv = document.getElementById("content");
  let html = `<h3>${title}</h3><ul>`;
  array.forEach((student) => {
    let li = `<li>${student}</li>`;
    html += li;
  });
  html += `</ul>`;
  contentDiv.innerHTML += html;
};
let averageGradeHigherThan3 = (data) => {
  let students = data
    .filter((x) => x.averageGrade > 3)
    .map(
      (x) =>
        `Name: ${x.firstName} ${x.lastName} Average Grade: ${x.averageGrade}`
    );
  printStudents(students, "All students with an average grade higher than 3");
};
let femaleNamesWithAnAverageGradeOf5 = (data) => {
  let students = data
    .filter((x) => x.averageGrade === 5)
    .filter((x) => x.gender === "Female")
    .map((x) => `Name: ${x.firstName} ${x.lastName}`);
  printStudents(
    students,
    "All female student names with an average grade of 5"
  );
};

let maleNamesFromSkopjeOver18 = (data) => {
  let students = data
    .filter((x) => x.city === "Skopje")
    .filter((x) => x.age > 18)
    .map((x) => `Name: ${x.firstName} ${x.lastName}`);
  printStudents(
    students,
    "All male student full names who live in Skopje and are over 18 years old"
  );
};

let femaleAverageGradesOver24 = (data) => {
  let students = data
    .filter((x) => x.gender === "Female")
    .filter((x) => x.averageGrade)
    .filter((x) => x.age > 24)
    .map(
      (x) =>
        `Name: ${x.firstName} ${x.lastName}, Average Grade: ${x.averageGrade}`
    );
  printStudents(
    students,
    "The average grades of all female students over the age of 24"
  );
};

let maleNameWithBAndAverageGradeOver2 = (data) => {
  let students = data
    .filter((x) => x.gender === "Male")
    .filter((x) => x.averageGrade > 2)
    .filter((x) => x.firstName.charAt(0) === "B")
    .map(
      (x) =>
        `Name: ${x.firstName} ${x.lastName}, Average Grade: ${x.averageGrade}`
    );
  printStudents(
    students,
    "All male students with a name starting with B and average grade over 2"
  );
};
(() => {
  fetch("./students.json")
    .then((response) => response.json())
    .then((data) => {
      averageGradeHigherThan3(data);
      femaleNamesWithAnAverageGradeOf5(data);
      maleNamesFromSkopjeOver18(data);
      femaleAverageGradesOver24(data);
      maleNameWithBAndAverageGradeOver2(data);
    });
})();
