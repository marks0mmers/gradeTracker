import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import Input from "../../../components/styled-inputs/Input";
import Button from "../../button/package/Button";

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

class Row extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.state = {
            formValues: Map(),
            initialKey: "",
        };
    }

    public componentDidUpdate(prevProps: Props) {
        if (this.props.isEditing !== prevProps.isEditing) {
            this.setState({
                formValues: Map<string, string>()
                    .set("primary", this.props.primaryProperty || "")
                    .set("secondary", this.props.secondaryProperty ? this.props.secondaryProperty.split("%")[0] : ""),
                initialKey: this.props.primaryProperty ? this.props.primaryProperty : "",
            });
        }
    }

    public render() {
        const {
            className,
            key,
            primaryProperty,
            secondaryProperty,
            isCreating,
            isEditing,
            primaryPlaceHolder,
            secondaryPlaceHolder,
        } = this.props;

        const {
            formValues,
        } = this.state;

        return (
            <div
                className={className}
                key={key}
                onClick={this.handleClick}
            >
                {
                    !isCreating && !isEditing
                    ? <>
                        <span className="primary">{primaryProperty}</span>
                        {secondaryProperty && <span className="secondary"><i>{secondaryProperty}</i></span>}
                    </>
                    : <>
                        <Input
                            name="primary"
                            value={formValues.get("primary")}
                            height={20}
                            gridArea="primary"
                            onChange={this.handleInputChange}
                            placeholder={primaryPlaceHolder}
                        />
                        <Input
                            name="secondary"
                            value={formValues.get("secondary")}
                            height={20}
                            gridArea="secondary"
                            onChange={this.handleInputChange}
                            placeholder={secondaryPlaceHolder}
                        />
                        <Button
                            tooltip="Cancel"
                            gridArea="cancel"
                            icon="clear"
                            height={50}
                            width={50}
                            marginLeftRight={5}
                            onClick={this.handleClear}
                        />
                        <Button
                            tooltip="Save"
                            gridArea="save"
                            icon="save"
                            height={50}
                            width={50}
                            marginLeftRight={5}
                            onClick={this.handleSave}
                        />
                    </>
                }
            </div>
        );
    }

    private handleClick() {
        const { primaryProperty, secondaryProperty } = this.props;
        const handler = this.props.onClick;
        if (handler && primaryProperty) {
            handler(primaryProperty, secondaryProperty);
        }
    }

    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { formValues } = this.state;
        const { name, value } = event.target;
        this.setState({
            formValues: formValues.set(name, value),
        });
    }

    private handleSave() {
        const { formValues, initialKey } = this.state;
        const primary = formValues.get("primary");
        const secondary = formValues.get("secondary");
        const handler = this.props.onSave;
        if (handler) {
            handler(primary, secondary, initialKey);
        }
    }

    private handleClear() {
        this.setState({
            formValues: Map(),
        });
        const handler = this.props.onClear;
        if (handler) {
            handler();
        }
    }
}

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
    background: ${(props) => props.isSelected
        ? props.isEditing
            ? props.theme.white
            : props.theme.quinary
        : props.theme.white};
    color: ${(props) => props.isSelected ? props.theme.primaryText : props.theme.primaryText};
    padding: 5px 0;
    border-bottom: solid #898989 1px;

    :hover {
        background: ${(props) => props.isCreating || props.isEditing
            ? props.theme.white
            : props.isSelected
                ? props.theme.quinaryHover
                : props.theme.hover
        };
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
