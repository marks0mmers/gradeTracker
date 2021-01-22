import styled from "styled-components";
import Button from "../../components/shared/Button";
import Divider from "../../components/shared/Divider";

interface Props {
    title: string;
    exitModal: () => void;
}

const ModalHeader = (props: Props) => (
    <div id="container">
        <Header id="header">
            <h2>{props.title}</h2>
            <Button
                icon="clear"
                width={50}
                height={30}
                onClick={props.exitModal}
            />
        </Header>
        <Divider
            top={10}
            bottom={10}
        />
    </div>
);

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export default ModalHeader;
