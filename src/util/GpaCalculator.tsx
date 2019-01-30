import { Course } from "src/models/Course";

export const getLetterGrade = (grade: number, course: Course) => {

    const { gradeScale } = course;

    // F
    if (grade < gradeScale.f) {
        return "F";
    }
    // D
    if (grade >= gradeScale.f && grade < gradeScale.dMinus) {
        return "D-";
    }
    if (grade >= gradeScale.dMinus && grade < gradeScale.d) {
        return "D";
    }
    if (grade >= gradeScale.d && grade < gradeScale.dPlus) {
        return "D+";
    }
    // C
    if (grade >= gradeScale.dPlus && grade < gradeScale.cMinus) {
        return "C-";
    }
    if (grade >= gradeScale.cMinus && grade < gradeScale.c) {
        return "C";
    }
    if (grade >= gradeScale.c && grade < gradeScale.cPlus) {
        return "C+";
    }
    // B
    if (grade >= gradeScale.cPlus && grade < gradeScale.bMinus) {
        return "B-";
    }
    if (grade >= gradeScale.bMinus && grade < gradeScale.b) {
        return "B";
    }
    if (grade >= gradeScale.b && grade < gradeScale.bPlus) {
        return "B+";
    }
    // A
    if (grade >= gradeScale.bPlus && grade < gradeScale.aMinus) {
        return "A-";
    }
    if (grade >= gradeScale.aMinus && grade < gradeScale.a) {
        return "A";
    }
    if (grade >= gradeScale.a) {
        return "A+";
    }
    return "?";
};

export const getGPAFromLetter = (letter: string) => {
    switch (letter) {
        case "F": return 0;
        case "D-": return 2 / 3;
        case "D": return 3 / 3;
        case "D+": return 4 / 3;
        case "C-": return 5 / 3;
        case "C": return 6 / 3;
        case "C+": return 7 / 3;
        case "B-": return 8 / 3;
        case "B": return 9 / 3;
        case "B+": return 10 / 3;
        case "A-": return 11 / 3;
        case "A": return 12 / 3;
        case "A+": return 13 / 3;
        default: return -1;
    }
};

export const getLetterFromGPA = (grade: number) => {
    // F
    if (grade <= 0) {
        return "F";
    }
    // D
    if (grade > 0 && grade <= (1 / 3)) {
        return "D-";
    }
    if (grade > (1 / 3) && grade <= (2 / 3)) {
        return "D";
    }
    if (grade > (2 / 3) && grade <= (3 / 3)) {
        return "D+";
    }
    // C
    if (grade > (3 / 3) && grade <= (4 / 3)) {
        return "C-";
    }
    if (grade > (4 / 3) && grade <= (5 / 3)) {
        return "C";
    }
    if (grade > (5 / 3) && grade <= (6 / 3)) {
        return "C+";
    }
    // B
    if (grade > (6 / 3) && grade <= (7 / 3)) {
        return "B-";
    }
    if (grade > (7 / 3) && grade <= (8 / 3)) {
        return "B";
    }
    if (grade > (8 / 3) && grade <= (9 / 3)) {
        return "B+";
    }
    // A
    if (grade > (9 / 3) && grade <= (10 / 3)) {
        return "A-";
    }
    if (grade > (10 / 3) && grade <= (11 / 3)) {
        return "A";
    }
    if (grade > 11 / 3) {
        return "A+";
    }
    return "?";
};
