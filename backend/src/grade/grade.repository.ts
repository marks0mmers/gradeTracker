import { injectable } from "inversify";
import * as _ from "lodash";
import { gradeCategoryDatabase } from "../grade-category/grade-category.schema";
import { gradeDatabase, GradeDocument, GradeDTO } from "./grade.schema";

export interface GradeRepository {
    findAll(): Promise<GradeDTO[]>;
    find(id: string): Promise<GradeDTO>;
    create(gradeDTO: GradeDTO): Promise<GradeDTO>;
    update(gradeDTO: GradeDTO): Promise<GradeDTO>;
    delete(id: string): Promise<GradeDTO>;
}

@injectable()
export class GradeRepositoryImpl implements GradeRepository {
    public async findAll(): Promise<GradeDTO[]> {
        return await gradeDatabase.find();
    }
    public async find(id: string): Promise<GradeDTO> {
        return await gradeDatabase.findById(id);
    }
    public async create(gradeDTO: GradeDTO): Promise<GradeDTO> {
        const gradeCategory = await gradeCategoryDatabase.findById(gradeDTO.gradeCategoryId);
        const createdGrade = await gradeDatabase.create(gradeDTO);
        if (gradeCategory.grades) {
            gradeCategory.grades.push(createdGrade._id);
        }
        gradeCategory.save();
        return createdGrade;
    }
    public async update(gradeDTO: GradeDTO): Promise<GradeDTO> {
        return await gradeDatabase.findByIdAndUpdate(gradeDTO._id, gradeDTO, (err: Error, res: GradeDocument) => res);
    }
    public async delete(id: string): Promise<GradeDTO> {
        const grade = await gradeDatabase.findById(id);
        const gradeCategory = await gradeCategoryDatabase.findById(grade.gradeCategoryId);
        if (gradeCategory.grades) {
            gradeCategory.grades = _.remove(gradeCategory.grades, (gradeId) => gradeId === id);
        }
        return await gradeDatabase.findByIdAndRemove(id);
    }

}
