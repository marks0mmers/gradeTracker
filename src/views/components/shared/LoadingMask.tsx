import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const ActivityLoading = () => (
    <Container>
        <div className="mask" />
        <BeatLoader loading={true} />
    </Container>
);

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 15;

    .mask {
        height: 100%;
        width: 100%;
        position: absolute;
        background: black;
        opacity: 0.2;
    }
`;

export default ActivityLoading;
