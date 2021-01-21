import { Map } from "immutable";
import React, { ChangeEvent, Fragment, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../../components/shared/Button";
import Input from "../../../components/styled-inputs/Input";

interface Props {
    className?: string;
    primaryProperty?: string;
    secondaryProperty?: string;
    isSelected?: boolean;
    isEditing?: boolean;
    key?: number;
    isCreating?: boolean;
    primaryPlaceHolder?: string;
    secondaryPlaceHolder?: string;

    onClick?: (primary: string, secondary?: string) => void;
    onSave?: (primary: string, secondary?: string, initialKey?: string) => void;
    onClear?: () => void;
}

const Row = ({onClear, onClick, onSave, ...props}: Props) => {

    //#region Component State
    const [formValues, setFormValues] = useState(Map<string, string>());
    const [initialKey, setInitialKey] = useState("");
    //#endregion

    //#region Lifecycle Methods
    useEffect(() => {
        setFormValues(Map<string, string>()
            .set("primary", props.primaryProperty ?? "")
            .set("secondary", props.secondaryProperty?.split("%")[0] ?? ""));
        setInitialKey(props.primaryProperty ?? "");
    }, [props.isEditing, props.primaryProperty, props.secondaryProperty]);
    //#endregion

    //#region Private Methods
    const handleClick = useCallback(() => {
        onClick?.(
            props.primaryProperty ?? "",
            props.secondaryProperty,
        );
    }, [onClick, props.primaryProperty, props.secondaryProperty]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues(formValues.set(name, value));
    }, [formValues]);

    const handleSave = useCallback(() => {
        const primary = formValues.get("primary", "");
        const secondary = formValues.get("secondary");
        onSave?.(primary, secondary, initialKey);
    }, [formValues, initialKey, onSave]);

    const handleClear = useCallback(() => {
        setFormValues(Map());
        onClear?.();
    }, [onClear]);
    //#endregion

    //#region Render Method
    return (
        <Container
            id="list-control-row"
            {...props}
            onClick={handleClick}
        >
            {!props.isCreating && !props.isEditing
                ? <Fragment>
                    <Primary id="primary">{props.primaryProperty}</Primary>
                    {props.secondaryProperty && <Secondary id="secondary"><i>{props.secondaryProperty}</i></Secondary>}
                </Fragment>
                : <Fragment>
                    <Input
                        name="primary"
                        value={formValues.get("primary")}
                        height={20}
                        gridArea="primary"
                        onChange={handleInputChange}
                        placeholder={props.primaryPlaceHolder}
                    />
                    <Input
                        name="secondary"
                        value={formValues.get("secondary")}
                        height={20}
                        gridArea="secondary"
                        onChange={handleInputChange}
                        placeholder={props.secondaryPlaceHolder}
                    />
                    <Button
                        tooltip="Cancel"
                        gridArea="cancel"
                        icon="clear"
                        height={50}
                        width={50}
                        marginLeftRight={5}
                        onClick={handleClear}
                    />
                    <Button
                        tooltip="Save"
                        gridArea="save"
                        icon="save"
                        height={50}
                        width={50}
                        marginLeftRight={5}
                        onClick={handleSave}
                    />
                </Fragment>
            }
        </Container>
    );
    //#endregion
};

const Primary = styled.span`
    grid-area: primary;
    font-size: 20px;
`;

const Secondary = styled.span`
    grid-area: secondary;
    opacity: 60%;
`;

const Container = styled.div<Props>`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: ${props => props.isCreating || props.isEditing
        ? "15px 1fr 50px 50px 15px"
        :  "15px 1fr 15px"
};
    grid-template-areas: ${props => props.isCreating || props.isEditing
        ?
        `". primary cancel save ."
             ". secondary cancel save ."`
        :
        `". primary ."
             ". secondary ."`
};
    grid-row-gap: 5px;
    background: ${props => props.isSelected && !props.isEditing ? "#79c8ec" : "white"};
    padding: 5px 0;
    border-bottom: solid #898989 1px;

    :hover {
        background: ${props => props.isCreating || props.isEditing ? "white" : "eee"};
    }
`;

export default Row;
