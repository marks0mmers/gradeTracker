import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { RequestWithUser } from "../auth/Auth";
import { authMiddleware } from "../auth/auth.middleware";
import TYPES from "../config/types";
import { CourseException } from "../exceptions/CourseException";
import { UserException } from "../exceptions/UserException";
import { GradeCategoryManager } from "../grade-category/grade-category.manager";
import { GradeCategory } from "../grade-category/grade-category.model";
import { UserManager } from "../user/user.manager";
import { User } from "../user/user.model";
import { CourseManager } from "./course.manager";
import { Course } from "./course.model";

@controller("/courses", authMiddleware)
export class CourseController {

    @inject(TYPES.CourseManager)
    private courseManager: CourseManager;

    @inject(TYPES.GradeCategoryManager)
    private gradeCategoryManager: GradeCategoryManager;

    @inject(TYPES.UserManager)
    private userManager: UserManager;

    @httpGet("/")
    public async getCoursesCurrentUser(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const courses = await this.courseManager.getCoursesCurrentUser(req.user._id);
            res.json(courses);
        } catch {
            next(new CourseException("Cannot Get Courses for current user"));
        }
    }

    @httpGet("/:id")
    public async getCourse(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const course = await this.courseManager.getCourse(req.params.id as string);
            res.json(course);
        } catch {
            next(new CourseException("Cannot Get course for id: " + req.params.id));
        }
    }

    @httpPost("/")
    public async newCourse(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        let user: User;
        try {
            user = await this.userManager.getUser(req.user._id);
        } catch {
            next(new UserException("Cannot get the user by id: " + req.user._id));
        }

        const course = new Course(
            req.body.title,
            req.body.description,
            req.body.section,
            req.body.creditHours,
            user.id
        );
        try {
            const createdCourse = await this.courseManager.createCourse(course);
            res.json(createdCourse);
        } catch {
            next(new CourseException("Cannot create a new course"));
        }
    }

    @httpPut("/:id")
    public async updateCourse(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const course = new Course(
            req.body.title,
            req.body.description,
            req.body.section,
            req.body.creditHours,
            req.user._id,
            req.params.id
        );

        try {
            const updatedCourse = await this.courseManager.updateCourse(course);
            res.json(updatedCourse);
        } catch {
            next(new CourseException("Cannot update Course with id: " + req.params.id));
        }
    }

    @httpDelete("/:id")
    public async deleteCourse(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        try {
            const deletedCourse = await this.courseManager.deleteCourse(id);
            if (deletedCourse) {
                res.json(deletedCourse);
            } else {
                next(new CourseException("Cannot find course with id: " + req.params.id));
            }
        } catch {
            next(new CourseException("Cannot delete course"));
        }
    }

    @httpGet("/user/:userId")
    public async getCoursesAndCategoriesByUser(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const userToGet = req.params.userId;
        const currentUser = req.user._id.toString();
        try {
            const courses = await this.courseManager.getCoursesByUser(currentUser, userToGet);
            if (courses) {
                const categories = await this.gradeCategoryManager.getAllForUser(userToGet);
                res.json({courses, categories});
            }
        } catch {
            next(new CourseException("Cannot get courses for user: " + userToGet));
        }
    }

}
