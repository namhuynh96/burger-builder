import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckourSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentDidMount() {
        //My solution:
        // const query = new URLSearchParams(this.props.location.search);
        // let ingredientsArr = [];
        // for (let param of query.entries()) {
        //     ingredientsArr = ingredientsArr.concat([param]);
        // }
        // if (ingredientsArr.length > 0) {
        //     const ingredientsObj = Object.assign(...ingredientsArr.map(([key, value]) => ({ [key]: +value })));
        //     this.setState({ ingredients: ingredientsObj });
        // }

        //Teacher's solution:
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, price: totalPrice });
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace(this.props.match.path + '/contact-data');
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.state.ingredients ?
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />
                    : <h3>Loading...!</h3>}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                            {...props} />)} />
            </div>
        );
    }
}

export default Checkout;