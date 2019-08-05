import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
    const buttonStyles = [classes.Button, classes[props.buttonType]].join(' ');
    return (
        <button 
            className={buttonStyles}
            disabled={props.disabled}
            onClick={props.clicked}>{props.children}</button>
    )
}
    
export default button;

