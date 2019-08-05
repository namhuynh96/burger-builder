import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    //My solution
    // const ingredients = Object.keys(props.ingredients).map(ing => {
    //     return (
    //         ing + '(' + props.ingredients[ing] + ')'
    //     );
    // });
    // const ingredientsString = ingredients.join(', ');
    // console.log(ingredientsString);

    // Teacher solution:
    const ingredients = [];
    for (let ingName in props.ingredients) {
        ingredients.push(
            {
                name: ingName,
                amount: props.ingredients[ingName]
            }
        );
    }

    const ingredientsOutput = ingredients.map(ig => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                }}>{ig.name} ({ig.amount})</span>
        )
    });
    //console.log(ingredientsOutput);
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{props.totalPrice}</strong></p>
        </div>
    );
}

export default order;