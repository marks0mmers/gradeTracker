import { Container } from "inversify";
import { CourseManager, CourseManagerImpl } from "../course/course.manager";
import { CourseRepository, CourseRepositoryImpl } from "../course/course.repository";
import { GradeCategoryManager, GradeCategoryManagerImpl } from "../grade-category/grade-category.manager";
import { GradeCategoryRepository, GradeCategoryRepositoryImpl } from "../grade-category/grade-category.repository";
import { GradeManager, GradeManagerImpl } from "../grade/grade.manager";
import { GradeRepository, GradeRepositoryImpl } from "../grade/grade.repository";
import { RoleManager, RoleManagerImpl } from "../role/role.manager";
import { RoleRepository, RoleRepositoryImpl } from "../role/role.repository";
import { UserManager, UserManagerImpl } from "../user/user.manager";
import { UserRepository, UserRepositoryImpl } from "../user/user.repository";
import { ViewRequestManager, ViewRequestManagerImpl } from "../view-request/view-request.manager";
import { ViewRequestRepository, ViewRequestRepositoryImpl } from "../view-request/view-request.repository";
import TYPES from "./types";

const container = new Container();

container.bind<CourseManager>(TYPES.CourseManager).to(CourseManagerImpl);
container.bind<CourseRepository>(TYPES.CourseRepository).to(CourseRepositoryImpl);

container.bind<UserManager>(TYPES.UserManager).to(UserManagerImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

container.bind<RoleManager>(TYPES.RoleManager).to(RoleManagerImpl);
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepositoryImpl);

container.bind<GradeCategoryManager>(TYPES.GradeCategoryManager).to(GradeCategoryManagerImpl);
container.bind<GradeCategoryRepository>(TYPES.GradeCategoryRepository).to(GradeCategoryRepositoryImpl);

container.bind<ViewRequestRepository>(TYPES.ViewRequestRepository).to(ViewRequestRepositoryImpl);
container.bind<ViewRequestManager>(TYPES.ViewRequestManager).to(ViewRequestManagerImpl);

container.bind<GradeManager>(TYPES.GradeManager).to(GradeManagerImpl);
container.bind<GradeRepository>(TYPES.GradeRepository).to(GradeRepositoryImpl);

export default container;
