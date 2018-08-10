import * as React from "react";
import styled from "styled-components";
import Input from "../../../components/styled-inputs/Input";

interface Props {
    className?: string;
    primaryProperty?: string;
    secondaryProperty?: string;
    isSelected?: boolean;
    key?: number;
    isCreating?: boolean;
    onSave?: (primary: string, secondary: string) => void;
}

class Row extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
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
            <div className={className} key={key}>
                {
                    !isCreating
                    ? <>
                    <span className="primary">{primaryProperty}</span>
                    {secondaryProperty && <span className="secondary"><i>{secondaryProperty}</i></span>}
                    </>
                    : <>
                    <Input
                        height={20}
                        gridArea="primary"
                    />
                    <Input
                        height={20}
                        gridArea="secondary"
                    />
                    </>
                }
            </div>
        );
    }
}

export default styled(Row)`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 15px 1fr 15px;
    grid-template-areas: ". primary ."
                         ". secondary .";
    grid-row-gap: 5px;
    background: ${(props) => props.theme.white};
    padding: 5px 0;
    border-bottom: solid #898989 1px;
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
