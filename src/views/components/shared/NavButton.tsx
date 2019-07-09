import React, { useCallback } from "react";
import styled from "styled-components";
import Icon from "./Icon";

interface Props {
    id?: string;
    className?: string;
    iconName: string;
    activeButton?: string;

    onClick: (id: string) => void;
}

const NavButton = (props: Props) => {

    const { onClick } = props;

    const handleClick = useCallback(() => {
        if (props.id) {
            onClick(props.id);
        }
    }, [onClick, props.id]);

    return (
        <div id={props.id} className={props.className} onClick={handleClick}>
            <Icon
                iconName={props.iconName}
                size={50}
                margin={5}
            />
        </div>
    );
};

export default styled(NavButton)`
    color: #333333;
    background: ${(props) => props.id === props.activeButton ? "#4c4f52" : "#5f6366"};
    :hover {
        background: #6e7377;
        cursor: pointer;
    }
`;
