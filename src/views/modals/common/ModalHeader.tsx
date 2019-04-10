import React from "react";
import Divider from "src/views/components/Divider";
import Button from "src/views/controls/button/Button";
import styled from "styled-components";

interface Props {
    className?: string;
    title: string;
    exitModal: () => void;
}

const ModalHeader = (props: Props) => (
    <div className={props.className}>
        <div className="header">
            <h2>{props.title}</h2>
            <Button
                icon="clear"
                width={50}
                height={30}
                onClick={props.exitModal}
            />
        </div>
        <Divider
            top={10}
            bottom={10}
        />
    </div>
);

export default styled(ModalHeader)`
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;
