import { List } from "immutable";
import * as React from "react";
import styled from "styled-components";
import ListFooter from "../components/ListFooter";
import ListHeader from "../components/ListHeader";
import Row from "../components/Row";
import { ListControlElement } from "../models/ListControlElement";

interface Props {
    className?: string;
    elements?: List<ListControlElement>;
    header?: boolean;
    headerText?: string;
    footer?: boolean;
    gridArea?: string;
    margin?: number;
    footerContent?: JSX.Element;
    showInputRow?: boolean;
    onRowSave?: (primary: string, secondary: string) => void;
}

class ListControl extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
            header,
            footer,
            elements,
            footerContent,
            headerText,
            showInputRow,
        } = this.props;

        return (
            <div className={className}>
                {
                    header &&
                    <ListHeader
                        headerText={headerText}
                    />
                }
                <div className="body">
                    {
                        showInputRow &&
                        <Row
                            isCreating={showInputRow}
                            onSave={this.props.onRowSave}
                        />
                    }
                    {
                        elements && elements.map((value: ListControlElement, key: number) => {
                            return (
                                <Row
                                    key={key}
                                    primaryProperty={value.primaryProperty}
                                    secondaryProperty={value.secondaryProperty}
                                    isSelected={value.isSelected}
                                />
                            );
                        }).toArray()
                    }
                </div>
                {
                    footer &&
                    <ListFooter
                        content={footerContent}
                    />
                }
            </div>
        );
    }
}

export default styled(ListControl)`
    grid-area: ${(props) => props.gridArea};
    overflow-y: auto;
    margin: ${(props) => props.margin}px;
    display: flex;
    flex-direction: column;
    .body {
        overflow-y: scroll;
    }
`;
