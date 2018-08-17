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
    key?: number;
    isCreating?: boolean;

    onClick?: (primary: string, secondary?: string) => void;
    onSave?: (primary: string, secondary?: string) => void;
}

interface State {
    formValues: Map<string, string>;
}

class Row extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            formValues: Map(),
        };
    }

    public render() {
        const {
            className,
            key,
            primaryProperty,
            secondaryProperty,
            isCreating,
        } = this.props;

        return (
            <div
                className={className}
                key={key}
                onClick={this.handleClick}
            >
                {
                    !isCreating
                    ? <>
                        <span className="primary">{primaryProperty}</span>
                        {secondaryProperty && <span className="secondary"><i>{secondaryProperty}</i></span>}
                    </>
                    : <>
                        <Input
                            name="primary"
                            height={20}
                            gridArea="primary"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            name="secondary"
                            height={20}
                            gridArea="secondary"
                            onChange={this.handleInputChange}
                        />
                        <Button
                            gridArea="save"
                            icon="save"
                            height={50}
                            width={50}
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
        const { formValues } = this.state;
        const primary = formValues.get("primary");
        const secondary = formValues.get("secondary");
        const handler = this.props.onSave;
        if (handler) {
            handler(primary, secondary);
        }
    }
}

export default styled(Row)`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: ${(props) => props.isCreating ? "15px 1fr 40px 15px" :  "15px 1fr 15px"};
    grid-template-areas: ${(props) => props.isCreating
        ?
            `". primary save ."
             ". secondary save ."`
        :
            `". primary ."
             ". secondary ."`
    };
    grid-row-gap: 5px;
    background: ${(props) => props.isSelected ? props.theme.quinary : props.theme.white};
    padding: 5px 0;
    border-bottom: solid #898989 1px;

    :hover {
        background: ${(props) => props.isCreating
            ? props.theme.white
            : props.isSelected
                ? props.theme.quinaryHover
                : props.theme.hover
        };
    }

    .primary {
        grid-area: primary;
        font-size: 20px;
        color: ${(props) => props.theme.primaryText};
    }

    .secondary {
        grid-area: secondary;
        color: ${(props) => props.theme.primaryText};
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
