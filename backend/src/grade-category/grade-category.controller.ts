import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { RequestWithUser } from "../auth/Auth";
import { authMiddleware } from "../auth/auth.middleware";
import TYPES from "../config/types";
import { GradeCategoryException } from "../exceptions/GradeCategoryException";
import { GradeCategory } from "../grade-category/grade-category.model";
import { GradeCategoryManager } from "./grade-category.manager";

@controller("/gradeCategories", authMiddleware)
export class GradeCategoryController {

    @inject(TYPES.GradeCategoryManager)
    private gradeCategoryManager: GradeCategoryManager;

    @httpGet("/")
    public async getAllForCurrentUser(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const userId = req.user._id;
        try {
            const gradeCategories = await this.gradeCategoryManager.getAllForUser(userId);
            res.json(gradeCategories);
        } catch {
            next(new GradeCategoryException("Cannot get all Grade Categories for current user"));
        }
    }

    @httpGet("/course/:courseId")
    public async getAllByCourse(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const courseId = req.params.courseId;
        try {
            const gradeCategories = await this.gradeCategoryManager.getAll(courseId);
            res.json(gradeCategories);
        } catch {
            next(new GradeCategoryException("Cannot get all Grade Categories for course: " + courseId));
        }
    }

    @httpGet("/:id")
    public async getOne(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const categoryId = req.params.id;
        try {
            const gradeCategory = await this.gradeCategoryManager.getOne(categoryId);
            res.json(gradeCategory);
        } catch {
            next(new GradeCategoryException("Cannot get the Grade Category: " + categoryId));
        }
    }

    @httpPost("/course/:courseId")
    public async create(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const gradeCategory = new GradeCategory(
            req.body.title,
            req.body.percentage,
            req.body.numberOfGrades,
            req.params.courseId,
            []
        );

        try {
            const createdCategory = await this.gradeCategoryManager.create(gradeCategory);
            res.json(createdCategory);
        } catch {
            next(new GradeCategoryException("Cannot create new Grade Category"));
        }
    }

    @httpPut("/:id")
    public async update(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const gradeCategory = new GradeCategory(
            req.body.title,
            req.body.percentage,
            req.body.numberOfGrades,
            req.body.courseId,
            req.body.grades,
            req.params.id
        );

        try {
            const createdCategory = await this.gradeCategoryManager.update(gradeCategory);
            res.json(createdCategory);
        } catch {
            next(new GradeCategoryException("Cannot update Grade Category: " + req.params.id));
        }
    }

    @httpDelete("/:id")
    public async delete(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        try {
            const deletedCourse = await this.gradeCategoryManager.delete(id);
            if (deletedCourse) {
                res.json(deletedCourse);
            } else {
                next(new GradeCategoryException("Cannot find Grade Category: " + id));
            }
        } catch {
            next(new GradeCategoryException("Cannot delete Grade Category"));
        }
    }

}
