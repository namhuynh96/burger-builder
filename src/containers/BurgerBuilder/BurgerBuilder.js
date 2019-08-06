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
import * as actionTypes from '../../store/actions';

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
            purchasing: false,
            loading: false,
            error: false
        };
        this.purchasingHandler = this.purchasingHandler.bind(this);
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
        queryParams.push('price=' + encodeURIComponent(this.props.price.toFixed(2)));
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
        this.props.onLoadIngredient();
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
                        ingredientAdded={this.props.onAddingIngredient}
                        ingredientRemoved={this.props.onRemovingIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchasable={this.props.purchasable}
                        orderClicked={this.purchasingHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                cancel={this.puchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.props.price} />
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
        ingredients: state.ingredients,
        price: state.price,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        onLoadIngredient: () => dispatchEvent({type: actionTypes.LOAD_INGREDIENT}),
        onAddingIngredient: (ingType) => dispatchEvent({type: actionTypes.ADD_INGREDIENT, ingType: ingType}),
        onRemovingIngredient: (ingType) => dispatchEvent({type: actionTypes.REMOVE_INGREDIENT, ingType: ingType})
    }
}
//withErrorHandler(BurgerBuilder, axios)
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)) ; 