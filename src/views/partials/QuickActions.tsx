import * as FileSaver from "file-saver";
import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { encryptByDES } from "../../util/Encryption";
import Icon from "../components/Icon";

interface Props {
    className?: string;
    icon?: string;
    courses?: Map<string, Course>;
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
                        <div className="menu-item">Close</div>
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
    }

    private handleSave() {
        const { courses } = this.props;
        const courseString = encryptByDES(JSON.stringify(courses));
        const file = new File([courseString], "test.txt", {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);
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
