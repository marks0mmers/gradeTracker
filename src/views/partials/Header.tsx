import { List, Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import { Theme } from "../../models/Theme";
import { ClearCoursesCreator, SetCoursesCreator } from "../../state/ducks/data/courses";
import { SetActiveThemeCreator } from "../../state/ducks/session/actions";
import { decryptByDES } from "../../util/Encryption";
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

interface Props {
    className?: string;
    icon?: string;
    title?: string;
    themes?: Map<string, Theme>;
    courses?: Map<string, Course>;

    setActiveTheme: typeof SetActiveThemeCreator;
    setCourses: typeof SetCoursesCreator;
    clearCourses: typeof ClearCoursesCreator;
}

interface State {
    file: File | null;
}

class Header extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.handleFileOpened = this.handleFileOpened.bind(this);
        this.handleClearCourses = this.handleClearCourses.bind(this);

        this.state = {
            file: null,
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
                <input
                    type="file"
                    id="file-chooser"
                    onChange={this.handleFileOpened}
                    className="file-chooser"
                    value={file ? file.path : ""}
                />
                <ThemeSelector>
                    <select
                        className="theme-selector"
                        onChange={this.handleThemeChange}
                    >
                        {
                            themes && themes.map((theme: Theme, key: string) => (
                                <option key={key} value={key}>{key}</option>
                            ))
                        }
                    </select>
                </ThemeSelector>
            </div>
        );
    }

    private handleClearCourses() {
        const handler = this.props.clearCourses;
        if (handler) {
            handler();
        }
        this.setState({
            file: null,
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

    private handleFileOpened(event: React.ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;
        if (files) {
            const file = files.item(0);
            this.setState({
                file,
            });
            const reader = new FileReader();
            if (file) {
                reader.readAsBinaryString(file);
                reader.onloadend = () => {
                    const decrypted = decryptByDES((reader.result as string).substring(3));
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
                };
            }
        }
    }

}

export default styled(Header)`
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.black};
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
