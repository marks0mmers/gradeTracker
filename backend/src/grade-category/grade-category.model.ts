import { Grade } from "../grade/grade.model";

export class GradeCategory {
    public remainingGrades?: number;
    public currentAverage?: number;
    public guarenteedAverage?: number;
    public potentialAverage?: number;

    constructor(
        public title: string,
        public percentage: number,
        public numberOfGrades: number,
        public courseId: string,
        public grades: Grade[],
        public id?: string
    ) {}

    public calculateGrades(): GradeCategory {
        if (this.grades) {
            const { numberOfGrades, grades } = this;
            const totalOfCurrentGrades = grades.reduce((total: number, grade: Grade) => total += grade.grade, 0);
            const remainingGrades = numberOfGrades - grades.length;
            const currentAverage = totalOfCurrentGrades / (grades.length || 1);
            const potentialAverage = (totalOfCurrentGrades + 100 * remainingGrades) / numberOfGrades;
            const guarenteedAverage = totalOfCurrentGrades / numberOfGrades;
            this.remainingGrades = remainingGrades;
            this.currentAverage = currentAverage;
            this.potentialAverage = potentialAverage;
            this.guarenteedAverage = guarenteedAverage;
        }
        return this;
    }
}
