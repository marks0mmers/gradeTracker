import { injectable } from "inversify";
import { courseDatabase, CourseDocument, CourseDTO } from "./course.schema";

export interface CourseRepository {
    findAll(): Promise<CourseDTO[]>;
    findByUser(userId: string): Promise<CourseDTO[]>;
    find(id: string): Promise<CourseDTO>;
    create(courseDTO: CourseDTO): Promise<CourseDTO>;
    update(courseDTO: CourseDTO): Promise<CourseDTO>;
    delete(id: string): Promise<CourseDTO>;
}

@injectable()
export class CourseRepositoryImpl implements CourseRepository {

    public async findAll(): Promise<CourseDTO[]> {
        return await courseDatabase.find();
    }

    public async findByUser(userId: string): Promise<CourseDTO[]> {
        return await courseDatabase.find({userId});
    }

    public async find(id: string): Promise<CourseDTO> {
        return await courseDatabase.findById(id);
    }

    public async create(courseDTO: CourseDTO): Promise<CourseDTO> {
        return await courseDatabase.create(courseDTO);
    }

    public async update(courseDTO: CourseDTO): Promise<CourseDTO> {
        const course = await courseDatabase.findById(courseDTO._id);
        course.title = courseDTO.title;
        course.description = courseDTO.description;
        course.section = courseDTO.section;
        course.creditHours = courseDTO.creditHours;
        course.userId = courseDTO.userId;
        return await course.save();
    }

    public async delete(courseId: string): Promise<CourseDTO> {
        return await courseDatabase.findByIdAndRemove({_id: courseId});
    }

}
