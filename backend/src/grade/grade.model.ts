import { GradeDTO } from "./grade.schema";

export class Grade {
    constructor(
        public name: string,
        public grade: number,
        public gradeCategoryId: string,
        public id?: string
    ) {}
}

export const toGrade = (gradeDTO: GradeDTO): Grade => {
    return new Grade(
        gradeDTO.name,
        gradeDTO.grade,
        gradeDTO.gradeCategoryId,
        gradeDTO._id
    );
};

export const toGradeDTO = (grade: Grade): GradeDTO => {
    return {
        _id: grade.id,
        name: grade.name,
        grade: grade.grade,
        gradeCategoryId: grade.gradeCategoryId
    };
};
