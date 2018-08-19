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
    padding?: number;
    footerContent?: JSX.Element;
    showInputRow?: boolean;
    primaryPlaceHolder?: string;
    secondaryPlaceHolder?: string;

    onRowClick?: (primary: string, secondary?: string) => void;
    onRowClear?: () => void;
    onRowSave?: (primary: string, secondary?: string, initialKey?: string) => void;
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
                            onClear={this.props.onRowClear}
                            primaryPlaceHolder={this.props.primaryPlaceHolder}
                            secondaryPlaceHolder={this.props.secondaryPlaceHolder}
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
                                    isEditing={value.isEditing}
                                    primaryPlaceHolder={this.props.primaryPlaceHolder}
                                    secondaryPlaceHolder={this.props.secondaryPlaceHolder}
                                    onClick={this.props.onRowClick}
                                    onClear={this.props.onRowClear}
                                    onSave={this.props.onRowSave}
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
    padding: ${(props) => props.padding}px;
    display: flex;
    flex-direction: column;
    max-height: 93%;
    .body {
        overflow-y: scroll;
    }
`;
