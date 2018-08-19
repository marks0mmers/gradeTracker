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
import { SetActiveThemeCreator } from "../../state/ducks/session/actions";
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
        } = this.props;

        const {
            file,
        } = this.state;

        const endFileArray = file && file.split("/");
        let selectedFile = endFileArray && endFileArray[endFileArray.length - 1];
        selectedFile = selectedFile && selectedFile.split(".")[0];
        return (
            <div id="header" className={className}>
                {
                    icon &&
                    <QuickActions
                        icon={icon}
                        courses={courses}
                        clearCourses={this.handleClearCourses}
                    />
                }
                {title && <span className="title">{title}</span>}
                <FileSelector
                    onClick={this.handleShowDialog}
                >
                    <span>{selectedFile ? selectedFile : "Open File"}</span>
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
        const { dialog } = electron.remote;
        dialog.showOpenDialog(
            {
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
        this.setState({
            file,
        });
        if (file) {
            fs.readFile(file, (error: NodeJS.ErrnoException, data: Buffer) => {
                const decrypted = decryptByDES(data.toString());
                let newCourses = JSON.parse(decrypted) as Course[];
                newCourses = newCourses.map((value: Course) => {
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
                        ) : List(),
                    });
                });
                const handler = this.props.setCourses;
                if (handler) {
                    handler(List(newCourses));
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
