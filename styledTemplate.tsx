import * as React from "react";
import styled from "styled-components";

interface Props {
    className?: string;
}

class NAME extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
        } = this.props;

        return (
            <div className={className}>
                <></>
            </div>
        );
    }
}

export default styled(NAME)`

`;
