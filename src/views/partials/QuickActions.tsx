// tslint:disable-next-line:no-any
const electron = (window as any).require("electron");
const fs = electron.remote.require("fs");
import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { SetActiveFileCreator } from "../../state/ducks/session";
import { encryptByDES } from "../../util/Encryption";
import Icon from "../components/Icon";

interface Props {
    className?: string;
    icon?: string;
    courses?: Map<string, Course>;
    fileName?: string;
    filePath?: string;

    setFile?: typeof SetActiveFileCreator;
    clearCourses: () => void;
}

interface State {
    isOpen: boolean;
}

class QuickActions extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleToggleMenu = this.handleToggleMenu.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveAs = this.handleSaveAs.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            isOpen: false,
        };
    }

    public render() {
        const {
            className,
            icon,
        } = this.props;

        const {
            isOpen,
        } = this.state;

        return (
            <div
                className={className}
                onClick={this.handleToggleMenu}
            >
                <Icon
                    size={40}
                    iconName={icon || ""}
                    margin={10}
                />
                {
                    isOpen &&
                    <div className="menu">
                        <div
                            className="menu-item"
                            onClick={this.handleNew}
                        >
                            New Session
                        </div>
                        <div
                            className="menu-item"
                            onClick={this.handleSave}
                        >
                            Save
                        </div>
                        <div
                            className="menu-item"
                            onClick={this.handleSaveAs}
                        >
                            Save As
                        </div>
                        <div
                            className="menu-item"
                            onClick={this.handleClose}
                        >
                            Close
                        </div>
                    </div>
                }
            </div>
        );
    }

    private handleNew() {
        const handler = this.props.clearCourses;
        if (handler) {
            handler();
        }
        const clearFile = this.props.setFile;
        if (clearFile) {
            clearFile("", "");
        }
    }

    private handleSave() {
        const { courses, fileName, filePath } = this.props;
        const courseString = encryptByDES(JSON.stringify(courses));
        const dialog = electron.remote.dialog;

        // tslint:disable-next-line:no-any
        fs.writeFile(`${filePath}${fileName}`, courseString, (error: any) => {
            if (error) {
            dialog.showErrorBox(
                "Save Failed",
                `An error occured saving the file ${error.message}`,
            );
            }
            dialog.showMessageBox({
                buttons: ["OK"],
                message: "The courses was successfully saved",
                title: "Grade Tracker",
                type: "none",
            });
        });
    }

    private handleSaveAs() {
        const { courses, filePath } = this.props;
        const courseString = encryptByDES(JSON.stringify(courses));
        const dialog = electron.remote.dialog;

        dialog.showSaveDialog(
            {
              defaultPath: filePath,
            },
            (filePathName: string) => {
                if (filePathName === undefined) {
                    return;
                }
                // tslint:disable-next-line:no-any
                fs.writeFile(filePathName, courseString, (error: any) => {
                    if (error) {
                    dialog.showErrorBox(
                        "Save Failed",
                        `An error occured saving the file ${error.message}`,
                    );
                    return;
                    }
                    dialog.showMessageBox({
                        buttons: ["OK"],
                        message: "The courses was successfully saved",
                        title: "Grade Tracker",
                        type: "none",
                    });
                });
            });
    }

    private handleClose() {
        const window = electron.remote.getCurrentWindow();
        window.close();
    }

    private handleToggleMenu() {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen,
        });
    }

}

export default styled(QuickActions)`
    display: flex;
    width: 60px;
    position: relative;
    :hover {
        background: ${(props) => props.theme.primaryHover}
    }

    .menu {
        background: ${(props) => props.theme.white};
        position: absolute;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.19);
        min-width: 130px;
        width: 130px;
    }

    .menu-item {
        padding: 5px 15px;
        :hover {
            background: ${(props) => props.theme.hover};
        }
    }

`;
