import styled from "styled-components";

interface Props {
    height: number;
    width: number;
    content: string;
}

const HeaderCell = (props: Props) => (
    <Container id="header-cell" {...props}>
        <HeaderLabel id="header-label" height={props.height}>{props.content}</HeaderLabel>
    </Container>
);

const HeaderLabel = styled.span<{height: number}>`
    margin: auto;
    line-height: ${props => props.height}px;
    font-size: 1.1vw;
`;

const Container = styled.div<Props>`
    display: flex;
    flex: 1;
    background: "#99ced3";
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border-bottom: solid black 1px;
`;

export default HeaderCell;
