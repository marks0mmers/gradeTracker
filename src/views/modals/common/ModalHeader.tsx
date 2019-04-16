import React from "react";
import styled from "styled-components";
import Divider from "../../components/Divider";
import Button from "../../controls/button/Button";

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
