import { List } from "immutable";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled, { withTheme } from "styled-components";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { Course } from "../../models/Course";
import { Theme } from "../../models/Theme";
import Divider from "../components/Divider";
import DataGrid, { DataGridColumnDefinition, DataGridElement } from "../controls/data-grid";

interface GraphData {
    name: string;
    Current: number;
    Guarenteed: number;
    Potential: number;
}

interface Props {
    className?: string;
    theme?: Theme;
    courses?: Map<string, Course>;
    elements?: List<DataGridElement<AnalysisCourse>>;
    columns?: List<DataGridColumnDefinition<AnalysisCourse>>;
}

class AnalysisContent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
            columns,
            elements,
            theme,
        } = this.props;

        const analysisCourses = elements
            && elements.map((value: DataGridElement<AnalysisCourse>) => value.payload).toList();

        const graphData: GraphData[] | undefined = analysisCourses && analysisCourses.map((value: AnalysisCourse) => {
            return {
                Current: value.currentGPA,
                Guarenteed: value.guarenteedGPA,
                Potential: value.potentialGPA,
                name: value.title,
            };
        }).toArray();

        return (
            <div className={className}>
                <h2
                    className="route"
                >
                    Analysis
                </h2>
                <Divider isVertical={false} gridArea="divider"/>
                <DataGrid
                    id="analysis-grid"
                    gridArea="grid"
                    rowHeight={30}
                    columnDefinitions={columns}
                    elements={elements}
                />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={graphData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="name"
                            tick={{fill: theme ? theme.primaryText : "#fff"}}
                        />
                        <YAxis
                            tick={{fill: theme ? theme.primaryText : "#fff"}}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Current" fill="#8884d8" />
                        <Bar dataKey="Guarenteed" fill="#84a9af" />
                        <Bar dataKey="Potential" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default styled(withTheme(AnalysisContent))`
    background: ${(props) => props.theme.white};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr 1fr;
    grid-template-areas: "subheader"
                         "divider"
                         "grid"
                         "graph";

    .route {
        padding: 10px;
        margin-left: 10px;
        color: ${(props) => props.theme.primaryText};
        cursor: default;
    }
`;
