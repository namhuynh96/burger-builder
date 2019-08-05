import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSum = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        )
    });
    return (
        <Aux >
            <h3>Your Order:</h3>
            <ul>
                {ingredientsSum}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <Button buttonType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux >
    );
}

export default orderSummary;