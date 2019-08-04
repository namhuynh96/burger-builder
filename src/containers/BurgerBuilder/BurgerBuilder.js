import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        let ing = { ...this.props.ingredients };
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
        let ing = { ...this.props.ingredients };
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
        
        //My solution:
        const ingredients = this.props.ingredients;
        const queryParams = Object.keys(ingredients).map(ingKey => {
            return encodeURIComponent(ingKey) + '=' + encodeURIComponent(ingredients[ingKey]) 
        });
        queryParams.push('price=' + encodeURIComponent(this.state.price.toFixed(2)));
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

        //Teacher's solution:
        // const queryParams = [];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // } 
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }

    componentDidMount() {
        axios.get('https://react-my-burger-27f38.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(err => {
                this.setState({ error: true });
            });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients can not loaded.</p> : <Spinner />;
        let orderSummary = null;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
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
                ingredients={this.props.ingredients}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

//const map

export default connect(mapStateToProps)(withErrorHandler(BurgerBuilder, axios)) ; 