// tslint:disable-next-line:no-any
const electron = (window as any).require("electron");
const fs = electron.remote.require("fs");
import { List, Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import { Theme } from "../../models/Theme";
import { ClearCoursesCreator, SetCoursesCreator } from "../../state/ducks/data/courses";
import { SetActiveFileCreator, SetActiveThemeCreator } from "../../state/ducks/session";
import { decryptByDES } from "../../util/Encryption";
import Icon from "../components/Icon";
import QuickActions from "./QuickActions";

const ThemeSelector = styled.div`
    display: flex;
    justify-content: center;
    height: 40px;
    margin: 10px;
    min-width: 100px;
    background: ${(props) => props.theme.tertiary};
    .theme-selector {
        width: 80px;
        margin: auto;
    }
`;

const FileSelector = styled.span`
    display: flex;
    line-height: 60px;
    padding: 0 10px;
    :hover {
        background: ${(props) => props.theme.primaryHover}
    }
`;

interface Props {
    className?: string;
    icon?: string;
    title?: string;
    themes?: Map<string, Theme>;
    courses?: Map<string, Course>;
    fileName?: string;
    filePath?: string;

    setActiveFile?: typeof SetActiveFileCreator;
    setActiveTheme?: typeof SetActiveThemeCreator;
    setCourses?: typeof SetCoursesCreator;
    clearCourses?: typeof ClearCoursesCreator;
}

interface State {
    file?: string;
}

class Header extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.handleFileOpened = this.handleFileOpened.bind(this);
        this.handleClearCourses = this.handleClearCourses.bind(this);
        this.handleShowDialog = this.handleShowDialog.bind(this);

        this.state = {
            file: "",
        };
    }

    public render() {
        const {
            className,
            icon,
            title,
            themes,
            courses,
            fileName,
            filePath,
            setActiveFile,
        } = this.props;

        const {
        } = this.state;
        return (
            <div id="header" className={className}>
                {
                    icon &&
                    <QuickActions
                        icon={icon}
                        courses={courses}
                        clearCourses={this.handleClearCourses}
                        fileName={fileName}
                        filePath={filePath}
                        setFile={setActiveFile}
                    />
                }
                {title && <span className="title">{title}</span>}
                <FileSelector
                    onClick={this.handleShowDialog}
                >
                    <span>{fileName ? fileName.split(".")[0] : "Open File"}</span>
                    <Icon
                        iconName="folder"
                        margin={5}
                    />
                </FileSelector>
                <ThemeSelector>
                    <select
                        className="theme-selector"
                        onChange={this.handleThemeChange}
                    >
                        {
                            themes && themes.map((theme: Theme, key: string) => (
                                <option key={key} value={key}>{key}</option>
                            )).toArray()
                        }
                    </select>
                </ThemeSelector>
            </div>
        );
    }

    private handleShowDialog() {
        const { filePath } = this.props;
        const { dialog } = electron.remote;
        dialog.showOpenDialog(
            {
                defaultPath: filePath ? filePath : undefined,
                properties: [
                    "openFile",
                    "createDirectory",
                ],
                title: "Open Course File",
            },
            this.handleFileOpened,
        );
    }

    private handleClearCourses() {
        const handler = this.props.clearCourses;
        if (handler) {
            handler();
        }
        this.setState({
            file: undefined,
        });
    }

    private handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const {
            themes,
        } = this.props;
        const handler = this.props.setActiveTheme;
        const selectedTheme = themes && themes.find((value: Theme, key: string) => event.target.value === key);
        if (handler && selectedTheme) {
            handler(selectedTheme);
        }
    }

    private handleFileOpened(files?: string[]) {
        const file = files && files[0];
        const fileName = file && file.split("/")[file.split("/").length - 1];
        const filePath = file && fileName && file.replace(fileName, "");
        const { setActiveFile } = this.props;
        if (setActiveFile) {
            setActiveFile(fileName || "", filePath || "");
        }
        this.setState({
            file,
        });
        if (file) {
            fs.readFile(file, (error: NodeJS.ErrnoException, data: Buffer) => {
                const decrypted = decryptByDES(data.toString());
                let newCourses = !Array.isArray(JSON.parse(decrypted))
                    ? Map<string, Course>(JSON.parse(decrypted))
                    : List<Course>(JSON.parse(decrypted) as Course[]);
                if (Map.isMap(newCourses)) {
                    newCourses = Map<string, Course>(newCourses).map((value: Course) => {
                        const categories = Map<string, GradeCategory>(value.categories || {});
                        return new Course({
                            ...value,
                            categories: categories.map((category: GradeCategory) => {
                                return new GradeCategory({
                                    ...category,
                                    grades: Map<string, number>(category.grades),
                                });
                            }).toMap(),
                        });
                    }).toMap();
                } else {
                    newCourses = List<Course>(newCourses).map((value: Course) => {
                        return new Course({
                            ...value,
                            categories: value.categories ? List(
                                value.categories.map((category) => {
                                    return new GradeCategory({
                                        ...category,
                                        grades: category ? Map({
                                            ...category.grades,
                                        }) : undefined,
                                    });
                                }),
                            ).reduce(
                                (categoryMap: Map<string, GradeCategory>, category: GradeCategory) =>
                                    categoryMap.set(category.title, category),
                                Map(),
                            )
                            : Map(),
                        });
                    }).toList();
                }
                const handler = this.props.setCourses;
                if (handler) {
                    handler(Map.isMap(newCourses)
                        ? Map<string, Course>(newCourses)
                        : List<Course>(newCourses).reduce(
                            (courseMap: Map<string, Course>, course: Course) => courseMap.set(course.title, course),
                            Map(),
                        ));
                }
            });
        }
    }

}

export default styled(Header)`
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.tertiaryText};
    grid-area: header;
    display: grid;
    grid-template-columns: 60px 1fr auto auto;

    .title {
        margin: auto 8px;
        font-size: 1.5em;
    }

    .file-chooser {
        margin: auto;
    }

`;
