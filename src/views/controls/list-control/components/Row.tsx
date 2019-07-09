import { Map } from "immutable";
import React, { ChangeEvent, Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { useComponentUpdate } from "../../../../util/Hooks";
import Input from "../../../components/styled-inputs/Input";
import Button from "../../button/Button";

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

interface State {
    formValues: Map<string, string>;
    initialKey: string;
}

const Row = (props: Props) => {

    const [state, setState] = useState<State>({
        formValues: Map<string, string>(),
        initialKey: "",
    });

    useComponentUpdate(() => {
        setState({
            formValues: Map<string, string>()
                .set("primary", props.primaryProperty || "")
                .set("secondary", props.secondaryProperty ? props.secondaryProperty.split("%")[0] : ""),
            initialKey: props.primaryProperty ? props.primaryProperty : "",
        });
    }, [props.isEditing]);

    const handleClick = useCallback(() => {
        const handler = props.onClick;
        if (handler && props.primaryProperty) {
            handler(
                props.primaryProperty,
                props.secondaryProperty,
            );
        }
    }, [props.onClick, props.primaryProperty, props.secondaryProperty]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState({
            ...state,
            formValues: state.formValues.set(name, value),
        });
    }, [state]);

    const handleSave = useCallback(() => {
        const primary = state.formValues.get("primary", "");
        const secondary = state.formValues.get("secondary");
        const handler = props.onSave;
        if (handler) {
            handler(primary, secondary, state.initialKey);
        }
    }, [props.onSave, state.formValues, state.initialKey]);

    const handleClear = useCallback(() => {
        setState({
            ...state,
            formValues: Map(),
        });
        const handler = props.onClear;
        if (handler) {
            handler();
        }
    }, [props.onClear, state]);

    return (
        <div
            className={props.className}
            key={props.key}
            onClick={handleClick}
        >
            {
                !props.isCreating && !props.isEditing
                ? <Fragment>
                    <span className="primary">{props.primaryProperty}</span>
                    {props.secondaryProperty && <span className="secondary"><i>{props.secondaryProperty}</i></span>}
                </Fragment>
                : <Fragment>
                    <Input
                        name="primary"
                        value={state.formValues.get("primary")}
                        height={20}
                        gridArea="primary"
                        onChange={handleInputChange}
                        placeholder={props.primaryPlaceHolder}
                    />
                    <Input
                        name="secondary"
                        value={state.formValues.get("secondary")}
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
        </div>
    );
};

export default styled(Row)`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: ${(props) => props.isCreating || props.isEditing
        ? "15px 1fr 50px 50px 15px"
        :  "15px 1fr 15px"
    };
    grid-template-areas: ${(props) => props.isCreating || props.isEditing
        ?
            `". primary cancel save ."
             ". secondary cancel save ."`
        :
            `". primary ."
             ". secondary ."`
    };
    grid-row-gap: 5px;
    background: ${(props) => props.isSelected && !props.isEditing ? "#79c8ec" : "white"};
    padding: 5px 0;
    border-bottom: solid #898989 1px;

    :hover {
        background: ${(props) => props.isCreating || props.isEditing ? "white" : "eee"};
    }

    .primary {
        grid-area: primary;
        font-size: 20px;
    }

    .secondary {
        grid-area: secondary;
        opacity: 60%;
    }

    .primary-input {
        grid-area: primary;
        margin-right: 15px;
    }

    .secondary-input {
        grid-area: secondary;
        margin-right: 15px;
    }
`;
