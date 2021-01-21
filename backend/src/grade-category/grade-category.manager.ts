import { ObjectId } from "bson";
import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { CourseManager } from "../course/course.manager";
import { Course } from "../course/course.model";
import { toGrade, toGradeDTO } from "../grade/grade.model";
import { GradeCategory } from "./grade-category.model";
import { GradeCategoryRepository } from "./grade-category.repository";
import { GradeCategoryDTO } from "./grade-category.schema";

export interface GradeCategoryManager {
    getAllForUser(userId: string): Promise<GradeCategory[]>;
    getAll(courseId: string): Promise<GradeCategory[]>;
    getOne(id: string): Promise<GradeCategory>;
    create(gradeCategory: GradeCategory): Promise<GradeCategory>;
    update(gradeCategory: GradeCategory): Promise<GradeCategory>;
    delete(id: string): Promise<GradeCategory>;
}

@injectable()
export class GradeCategoryManagerImpl implements GradeCategoryManager {

    @inject(TYPES.GradeCategoryRepository)
    private gradeCategoryRepository: GradeCategoryRepository;

    @inject(TYPES.CourseManager)
    private courseManager: CourseManager;

    public async getAllForUser(userId: string): Promise<GradeCategory[]> {
        const courses = await this.courseManager.getCoursesCurrentUser(userId);
        const courseIds = courses.map((c: Course) => c.id);
        return await this.gradeCategoryRepository.findAll()
            .then((categories: GradeCategoryDTO[]) => categories.map((g: GradeCategoryDTO) => this.toGradeCategory(g).calculateGrades()))
            .then((categories: GradeCategory[]) => categories.filter((g: GradeCategory) => {
                return courseIds.indexOf(new ObjectId(g.courseId).toHexString()) >= 0;
            }));
    }

    public async getAll(courseId: string): Promise<GradeCategory[]> {
        return await this.gradeCategoryRepository.findAll()
            .then((categories: GradeCategoryDTO[]) => categories.map((g: GradeCategoryDTO) => this.toGradeCategory(g).calculateGrades()))
            .then((categories: GradeCategory[]) => categories.filter((g: GradeCategory) => {
                return new ObjectId(g.courseId).toHexString() === courseId;
            }));
    }

    public async getOne(id: string): Promise<GradeCategory> {
        return await this.gradeCategoryRepository.find(id)
            .then((g: GradeCategoryDTO) => this.toGradeCategory(g).calculateGrades());
    }

    public async create(gradeCategory: GradeCategory): Promise<GradeCategory> {
        const gradeCategoryDTO = this.toGradeCategoryDTO(gradeCategory);
        return await this.gradeCategoryRepository.create(gradeCategoryDTO)
            .then((g: GradeCategoryDTO) => this.toGradeCategory(g).calculateGrades());
    }

    public async update(gradeCategory: GradeCategory): Promise<GradeCategory> {
        const gradeCategoryDTO = this.toGradeCategoryDTO(gradeCategory);
        return await this.gradeCategoryRepository.update(gradeCategoryDTO)
            .then((g: GradeCategoryDTO) => this.toGradeCategory(g).calculateGrades());
    }

    public async delete(id: string): Promise<GradeCategory> {
        return await this.gradeCategoryRepository.delete(id)
            .then((g: GradeCategoryDTO) => this.toGradeCategory(g).calculateGrades());
    }

    private toGradeCategory(gradeCategoryDTO: GradeCategoryDTO): GradeCategory {
        return new GradeCategory(
            gradeCategoryDTO.title,
            gradeCategoryDTO.percentage,
            gradeCategoryDTO.numberOfGrades,
            gradeCategoryDTO.courseId,
            gradeCategoryDTO.grades && gradeCategoryDTO.grades.map((g) => toGrade(g)),
            gradeCategoryDTO._id
        );
    }

    private toGradeCategoryDTO(gradeCategory: GradeCategory): GradeCategoryDTO {
        return {
            title: gradeCategory.title,
            percentage: gradeCategory.percentage,
            numberOfGrades: gradeCategory.numberOfGrades,
            courseId: gradeCategory.courseId,
            _id: gradeCategory.id,
            grades: gradeCategory.grades && gradeCategory.grades.map((g) => toGradeDTO(g))
        };
    }

}
