import React from "react";

import FieldName from "./FieldName";

import { WorkMeta } from '../../src/models/meta-cluster';
import classes from './WorkCard.module.css';

const WorkCard: React.FC<{work: WorkMeta}> = ({ work }) => {
    return <div className={classes.card}>
        <img className={classes.image} src={work.thumbnail} alt='Work preview'/>
        <p><FieldName>Stock ID:</FieldName> {work.stockid}</p>
        <p><FieldName>Description:</FieldName> {work.description}</p>
        <p><FieldName>Type:</FieldName> {work.type}</p>
        <p>
            <FieldName>Tags:</FieldName> {work.tags.join(', ')}
        </p>
    </div>
}

export default WorkCard;