import React from "react";

import classes from './Card.module.css';

interface Props {
    children: JSX.Element
}

const Card: React.FC<Props> = ({ children }) => {
    return <div className={classes.card}>{children}</div>
}

export default Card;