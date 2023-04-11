function Student(name, grade) {
    this.name = name
    this.grade = grade

    this.gradeAverage = () => {
        const sum = this.grade.reduce((currentSum, currentGrade) => currentSum + currentGrade, 0)
        const average = sum / this.grade.length
        return average
    }

    this.show = () => {
        return `The student, ${this.name}, has a grade average of: ${this.gradeAverage()}`
    }
}

const jane = new Student("Jane", [70, 80, 83])
const mark = new Student("Mark", [80,85])
const stacy = new Student("Stacy", [90, 95, 96])

document.addEventListener('DOMContentLoaded', function () {
    const students = [jane, mark, stacy]
    document.getElementById('jane_report').innerHTML = jane.show();

    students.forEach(student => {
        document.getElementById('student_report').innerHTML += `${student.show()} </br>`;
    })
})