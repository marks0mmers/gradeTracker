import { Course } from "../models/Course";

export const getLetterGrade = (grade: number, course: Course) => {
    // F
    if (grade < 60) {
        return "F";
    }
    // D
    if (grade >= 60 && grade < 62.5) {
        return "D-";
    }
    if (grade >= 62.5 && grade < 67.5) {
        return "D";
    }
    if (grade >= 67.5 && grade < 70) {
        return "D+";
    }
    // C
    if (grade >= 70 && grade < 72.5) {
        return "C-";
    }
    if (grade >= 72.5 && grade < 77.5) {
        return "C";
    }
    if (grade >= 77.5 && grade < 80) {
        return "C+";
    }
    // B
    if (grade >= 80 && grade < 82.5) {
        return "B-";
    }
    if (grade >= 82.5 && grade < 87.5) {
        return "B";
    }
    if (grade >= 87.5 && grade < 90) {
        return "B+";
    }
    // A
    if (grade >= 90 && grade < 92.5) {
        return "A-";
    }
    if (grade >= 92.5 && grade < 97.5) {
        return "A";
    }
    if (grade >= 97.5) {
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
