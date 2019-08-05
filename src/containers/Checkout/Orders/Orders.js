import React, { Component } from 'react';
import axiosOrder from '../../../axios/axios-order';
import Order from '../../../components/Order/Order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading:false
    }

    componentDidMount() {
        this.setState({loading: true});
        axiosOrder.get('orders.json').then((res) => {
            // My solution
            // let orderNumber = 0
            // let ordersObj = {};
            // if (res.data) {
            //     for (let key in res.data) {
            //         orderNumber++;
            //         ordersObj[orderNumber] = res.data[key];
            //     }
            //     this.setState({orders: ordersObj, loading: false});
            // } else {
            //     this.setState({loading: false});
            // }

            //Teacher's solution
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({orders: fetchedOrders, loading: false})
        }).catch(err => {
            console.log(err);
            this.setState({loading: false});
        });
    }

    render() {
        let loadedOrders = null;
        if (this.state.orders.length > 0) {
            loadedOrders = this.state.orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        totalPrice={order.price} />);
            })
        }
        if (this.state.loading) {
            loadedOrders = <Spinner />
        }
        return (
            <div>
                {loadedOrders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axiosOrder);