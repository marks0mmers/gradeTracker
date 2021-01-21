import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { RequestWithUser } from "../auth/Auth";
import { authMiddleware } from "../auth/auth.middleware";
import TYPES from "../config/types";
import { GradeException } from "../exceptions/GradeException";
import { GradeManager } from "./grade.manager";
import { Grade } from "./grade.model";

@controller("/grades", authMiddleware)
export class GradeController {

    @inject(TYPES.GradeManager)
    private gradeManager: GradeManager;

    @httpGet("/gradeCategory/:gradeCategoryId")
    public async getAllGrades(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const gradeCategoryId: string = req.params.gradeCategoryId;
        try {
            const grades = await this.gradeManager.getGradesFromCategory(gradeCategoryId);
            res.json(grades);
        } catch {
            next(new GradeException("Cannot get Grade for Grade Category: " + gradeCategoryId));
        }
    }

    @httpGet("/:gradeId")
    public async getGrade(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const gradeId: string = req.params.gradeId;
        try {
            const grade = await this.gradeManager.getGrade(gradeId);
            res.json(grade);
        } catch {
            next(new GradeException("Cannot get Grade: " + gradeId));
        }
    }

    @httpPost("/gradeCategory/:gradeCategoryId")
    public async createGrade(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const grade = new Grade(
            req.body.name,
            req.body.grade,
            req.params.gradeCategoryId
        );
        try {
            const createdGrade = await this.gradeManager.newGrade(grade);
            res.json(createdGrade);
        } catch {
            next(new GradeException("Cannot create new grade"));
        }
    }

    @httpPut("/:gradeId")
    public async updateGrade(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const grade = new Grade(
            req.body.name,
            req.body.grade,
            req.body.gradeCategoryId,
            req.params.gradeId
        );
        try {
            const updatedGrade = await this.gradeManager.updateGrade(grade);
            res.json(updatedGrade);
        } catch {
            next(new GradeException("Cannot update Grade: " + grade.id));
        }
    }

    @httpDelete("/:gradeId")
    public async deleteGrade(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const gradeId = req.params.gradeId;
        try {
            const deletedGrade = await this.gradeManager.deleteGrade(gradeId);
            if (deletedGrade) {
                res.json(deletedGrade);
            } else {
                next(new GradeException("Cannot find Grade: " + gradeId));
            }
        } catch {
            next(new GradeException("Cannot delete Grade"));
        }
    }

}
