import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { Grade, toGrade, toGradeDTO } from "./grade.model";
import { GradeRepository } from "./grade.repository";
import { GradeDTO } from "./grade.schema";

export interface GradeManager {
    getGradesFromCategory(gradeCategoryId: string): Promise<Grade[]>;
    getGrade(gradeId: string): Promise<Grade>;
    newGrade(grade: Grade): Promise<Grade>;
    updateGrade(grade: Grade): Promise<Grade>;
    deleteGrade(gradeId: string): Promise<Grade>;
}

@injectable()
export class GradeManagerImpl implements GradeManager {

    @inject(TYPES.GradeRepository)
    private gradeRepository: GradeRepository;

    public async getGradesFromCategory(gradeCategoryId: string): Promise<Grade[]> {
        return await this.gradeRepository.findAll()
            .then((dtos: GradeDTO[]) => dtos.map((dto) => toGrade(dto)))
            .then((grades: Grade[]) => grades.filter((grade: Grade) => grade.gradeCategoryId === gradeCategoryId));
    }

    public async getGrade(gradeId: string): Promise<Grade> {
        return await this.gradeRepository.find(gradeId)
            .then((grade: GradeDTO) => toGrade(grade));
    }

    public async newGrade(grade: Grade): Promise<Grade> {
        const newGrade = toGradeDTO(grade);
        return await this.gradeRepository.create(newGrade)
            .then((createdGrade: GradeDTO) => toGrade(createdGrade));
    }

    public async updateGrade(grade: Grade): Promise<Grade> {
        const newGrade = toGradeDTO(grade);
        return await this.gradeRepository.update(newGrade)
            .then((createdGrade: GradeDTO) => toGrade(createdGrade));
    }

    public async deleteGrade(gradeId: string): Promise<Grade> {
        return await this.gradeRepository.delete(gradeId)
            .then((g: GradeDTO) => toGrade(g));
    }

}
