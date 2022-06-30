import React from "react";

import Card from "../UI/Card";
import WorkCard from "./WorkCard";

import { WorkMeta } from "../../src/models/meta-clusterer";
import classes from './OutputSection.module.css';

interface OutputSectionProps {
    clusters: WorkMeta[][] | null,
    status: string | null
}

const OutputSection: React.FC<OutputSectionProps> = ({ clusters, status }) => {
    if (status) {
        return <Card><h1 className={classes.status}>{status}</h1></Card>
    }

    return <>
            {clusters && clusters.map(group => {
                return <Card key={Math.random()}><div  className={classes.container}>
                    {group.map(work => <WorkCard key={work.id} work={work}></WorkCard>)}
                </div></Card>;
            })}
        </>
}

export default OutputSection;