import { List } from "immutable";
import * as React from "react";
import styled from "styled-components";

export interface TitleRoute {
    title?: string;
    subRoute?: TitleRoute;
}

interface Props {
    className?: string;
    routes?: TitleRoute;

    onRootClick?: () => void;
}

class Title extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
            routes,
            onRootClick,
        } = this.props;

        let subRoutes: List<string> = List();
        let root = routes;
        while (root && root.subRoute && root.subRoute.title) {
            subRoutes = subRoutes.push(root.subRoute.title);
            root = root.subRoute;
        }

        return (
            <div id="title" className={className}>
                <h2
                    className="root"
                    onClick={onRootClick}
                >
                    {routes && routes.title}
                </h2>
                {
                    subRoutes.map((value: string, idx: number) => {
                        return (
                            <h2
                                key={idx}
                                className="sub-route"
                            >
                                {` > ${value}`}
                            </h2>
                        );
                    })
                }
            </div>
        );
    }
}

export default styled(Title)`
    padding: 10px;
    display: flex;
    min-height: fit-content;
    .sub-route {
        margin-left: 10px;
        color: ${(props) => props.theme.primaryText};
    }
    .root{
        cursor: pointer;
        &:hover {
            color: ${(props) => props.theme.secondary}
        }
        color: ${(props) => props.theme.primaryText};
    }
`;
