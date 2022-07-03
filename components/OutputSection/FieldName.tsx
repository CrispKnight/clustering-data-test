import React from 'react';

import classes from './FieldName.module.css';

interface FieldNameProps {
    children: string
}

const FieldName: React.FC<FieldNameProps> = ({ children }) => {
    return <span className={classes.field}>{ children }</span>
}

export default FieldName;