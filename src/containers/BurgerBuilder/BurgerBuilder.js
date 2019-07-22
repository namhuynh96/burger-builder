import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
            price: 4,
            purchasable: false,
            purchasing: false,
        };
        this.purchasingHandler = this.purchasingHandler.bind(this);
    }

    purchasableHandler(ingredients) {
        const sum = Object.keys(ingredients).map((ingKey) => {
            return ingredients[ingKey]
        }).reduce((acc, crr) => acc + crr, 0);
        this.setState({ purchasable: sum > 0 });
    };
    addingIngredientHandler = (type) => {
        let ing = { ...this.state.ingredients };
        ing[type]++;
        let oldPrice = this.state.price;
        let updatedPrice = INGREDIENTS_PRICE[type] + oldPrice;
        // console.log(updatedPrice);
        this.setState({
            ingredients: ing,
            price: updatedPrice
        });
        this.purchasableHandler(ing);
    }

    removeIngredientHandler = (type) => {
        let ing = { ...this.state.ingredients };
        let oldPrice = this.state.price;
        if (ing[type] <= 0) {
            return;
        }
        ing[type]--;
        let updatedPrice = oldPrice - INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: ing,
            price: updatedPrice
        });
        this.purchasableHandler(ing);
    }

    purchasingHandler() {
        this.setState({ purchasing: true });
    }

    puchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert('You continue order!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} backdropClicked={this.puchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancel={this.puchaseCancelHandler}
                        continue={this.purchaseContinueHandler}
                        price={this.state.price} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addingIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.price}
                    purchasable={this.state.purchasable}
                    orderClicked={this.purchasingHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder; 