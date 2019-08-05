import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputElementClasses = [classes.InputElement];
    let errorInputMessage = null;
    if (props.invalid && props.shouldCheckValid && props.touched) {
        inputElementClasses.push(classes.Invalid);
    }
    if(props.invalid && props.touched) {
        errorInputMessage = <p className={classes.ValidationError}>Please enter valid value!</p>;
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                name={props.name}
                onChange={props.onChanged} />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                name={props.name}
                onChange={props.onChanged} />
            break;
        case ('select'):
            const optionsArray = props.elementConfig.options;
            inputElement = (
                <select
                    className={inputElementClasses.join(' ')}
                    value={props.value}
                    name={props.name}
                    onChange={props.onChanged} >
                    {optionsArray.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                            hidden={option.hide}
                        >{option.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input
                className={inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                name={props.name}
                onChange={props.onChanged} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errorInputMessage}
        </div>
    )
}

export default input;