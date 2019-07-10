import { List } from "immutable";
import React, { ReactNode } from "react";
import styled from "styled-components";
import ListFooter from "../components/ListFooter";
import ListHeader from "../components/ListHeader";
import Row from "../components/Row";
import { ListControlElement } from "../models/ListControlElement";

interface Props {
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
    //#region Render Method
    <Container id="list-control" {...props}>
        {
            props.header &&
            <ListHeader
                headerText={props.headerText}
            />
        }
        <Body id="body">
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
        </Body>
        {
            props.footer &&
            <ListFooter>
                {props.footerContent}
            </ListFooter>
        }
    </Container>
    //#endregion
);

const Body = styled.div`
    overflow-y: scroll;
    flex: 1;
`;

const Container = styled.div<Props>`
    grid-area: ${(props) => props.gridArea};
    overflow-y: auto;
    padding: ${(props) => props.padding}px;
    display: flex;
    flex-direction: column;
    border: solid black 1px;
    max-height: 93%;
`;

export default ListControl;
