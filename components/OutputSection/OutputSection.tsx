import React from "react";

import Card from "../UI/Card";
import WorkCard from "./WorkCard";

import classes from './OutputSection.module.css';

const OutputSection: React.FC = () => {
    return <>
        <Card>
            <div className={classes.container}>
                <WorkCard />
                <WorkCard />
                <WorkCard />
                <WorkCard />
                <WorkCard />
                <WorkCard />
                <WorkCard />
            </div>
        </Card>
        <Card>
            <div className={classes.container}>
                <WorkCard />
                <WorkCard />
                <WorkCard />
            </div>
        </Card>
        </>
}

export default OutputSection;