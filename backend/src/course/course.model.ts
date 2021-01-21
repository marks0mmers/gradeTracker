import { CourseDTO } from "./course.schema";

export class Course {
    constructor(
        public title: string,
        public description: string,
        public section: number,
        public creditHours: number,
        public userId: string,
        public id?: string
    ) {}
}

export const toCourseDTO = (course: Course): CourseDTO => {
    return {
        title: course.title,
        description: course.description,
        section: course.section,
        creditHours: course.creditHours,
        userId: course.userId,
        _id: course.id
    };
};

export const toCourse = (courseDTO: CourseDTO): Course => {
    return new Course(
        courseDTO.title,
        courseDTO.description,
        courseDTO.section,
        courseDTO.creditHours,
        courseDTO.userId,
        courseDTO._id.toString()
    );
};
