import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
            ingredients: null,
            price: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
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
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Nam Huynh',
                address: {
                    street: '1234 Street',
                    zipCode: '21100',
                    country: 'VietNam'
                },
                email: '123@321.com'
            }
        }
        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false })
            });
    }

    componentDidMount() {
        axios.get('https://react-my-burger-27f38.firebaseio.com/ingredients.jso')
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(err => {
                this.setState({ error: true });
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients can not loaded.</p> : <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addingIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.price}
                        purchasable={this.state.purchasable}
                        orderClicked={this.purchasingHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                cancel={this.puchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.state.price} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                < Modal show={this.state.purchasing} backdropClicked={this.puchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios); 