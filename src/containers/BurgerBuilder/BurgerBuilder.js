import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    meat: 0.8,
    cheese: 0.4,
    bacon: 0.5,
    salad: 0.6
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                meat: 0,
                cheese: 0,
                bacon: 0,
                salad: 0,
            },
            price: 4
        }
    }

    addingIngredientHandler = (type) => {
        let ing = {...this.state.ingredients};
        ing[type]++;
        let oldPrice = this.state.price;
        let updatedPrice = INGREDIENTS_PRICE[type] + oldPrice;
        console.log(updatedPrice);
        this.setState({
            ingredients: ing,
            price: updatedPrice
        });
    }

    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addingIngredientHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder; 