import { List } from "immutable";
import React, { ReactNode } from "react";
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
    footerContent?: ReactNode | ReactNode[];
    showInputRow?: boolean;
    primaryPlaceHolder?: string;
    secondaryPlaceHolder?: string;

    onRowClick?: (primary: string, secondary?: string) => void;
    onRowClear?: () => void;
    onRowSave?: (primary: string, secondary?: string, initialKey?: string) => void;
}

const ListControl = (props: Props) => (
    <div className={props.className}>
        {
            props.header &&
            <ListHeader
                headerText={props.headerText}
            />
        }
        <div className="body">
            {
                props.showInputRow &&
                <Row
                    isCreating={props.showInputRow}
                    onSave={props.onRowSave}
                    onClear={props.onRowClear}
                    primaryPlaceHolder={props.primaryPlaceHolder}
                    secondaryPlaceHolder={props.secondaryPlaceHolder}
                />
            }
            {
                props.elements && props.elements.map((value: ListControlElement, key: number) => {
                    return (
                        <Row
                            key={key}
                            primaryProperty={value.primaryProperty}
                            secondaryProperty={value.secondaryProperty}
                            isSelected={value.isSelected}
                            isEditing={value.isEditing}
                            primaryPlaceHolder={props.primaryPlaceHolder}
                            secondaryPlaceHolder={props.secondaryPlaceHolder}
                            onClick={props.onRowClick}
                            onClear={props.onRowClear}
                            onSave={props.onRowSave}
                        />
                    );
                }).toArray()
            }
        </div>
        {
            props.footer &&
            <ListFooter
                content={props.footerContent}
            />
        }
    </div>
);

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
