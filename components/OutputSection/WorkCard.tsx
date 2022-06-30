import React from "react";

import { WorkMeta } from '../../src/models/meta-clusterer';
import classes from './WorkCard.module.css';

const WorkCard: React.FC<{work: WorkMeta}> = ({ work }) => {
    return <div className={classes.card}>
        <img className={classes.image} src={work.thumbnail} alt='Work preview'/>
        <h3>Stock ID: {work.stockid}</h3>
        <h4>Description: {work.description}</h4>
        <h4>Type: {work.type}</h4>
        <div>
            Tags: {work.tags.map(tag => 
                <span key={Math.random()}>{tag} </span>
            )}
        </div>
    </div>
}

export default WorkCard;