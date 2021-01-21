import { injectable } from "inversify";
import { gradeCategoryDatabase, GradeCategoryDocument, GradeCategoryDTO } from "./grade-category.schema";

export interface GradeCategoryRepository {
    findAll(): Promise<GradeCategoryDTO[]>;
    find(id: string): Promise<GradeCategoryDTO>;
    create(gradeCategoryDTO: GradeCategoryDTO): Promise<GradeCategoryDTO>;
    update(gradeCategoryDTO: GradeCategoryDTO): Promise<GradeCategoryDTO>;
    delete(id: string): Promise<GradeCategoryDTO>;
}

@injectable()
export class GradeCategoryRepositoryImpl implements GradeCategoryRepository {

    public async findAll(): Promise<GradeCategoryDTO[]> {
        const gradeCategories = await gradeCategoryDatabase.find()
            .populate("grades")
            .exec();
        return gradeCategories;
    }

    public async find(id: string): Promise<GradeCategoryDTO> {
        const gradeCategory = await gradeCategoryDatabase
            .findById(id)
            .populate("grades")
            .exec();
        return gradeCategory;
    }

    public async create(gradeCategoryDTO: GradeCategoryDTO): Promise<GradeCategoryDTO> {
        return await gradeCategoryDatabase.create(gradeCategoryDTO);
    }

    public async update(gradeCategoryDTO: GradeCategoryDTO): Promise<GradeCategoryDTO> {
        const gradeCategory = await gradeCategoryDatabase.findById(gradeCategoryDTO._id).populate("grades").exec();
        gradeCategory.title = gradeCategoryDTO.title;
        gradeCategory.percentage = gradeCategoryDTO.percentage;
        gradeCategory.numberOfGrades = gradeCategoryDTO.numberOfGrades;
        gradeCategory.courseId = gradeCategoryDTO.courseId;
        gradeCategory.grades = gradeCategoryDTO.grades;
        return await gradeCategory.save();
    }

    public async delete(id: string): Promise<GradeCategoryDTO> {
        return await gradeCategoryDatabase.findByIdAndRemove(id);
    }

}
