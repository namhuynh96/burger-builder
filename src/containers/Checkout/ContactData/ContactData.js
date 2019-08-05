import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosOrder from '../../../axios/axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'No method selected', displayValue: 'Please select delivery method.', hide: true },
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formValid: false,
        loading: false,

    }

    checkValidity(rules, value) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && isValid;
        }

        if (rules.maxLength) {
            isValid = (value.length <= rules.maxLength) && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        // My solution
        // const orderFormArray = Object.keys(this.state.orderForm).map(key => ({[key]: this.state.orderForm[key].value}));
        // const orderFormObj = {};
        // for (let i = 0; i < orderFormArray.length; i++) {
        //     const key = Object.keys(orderFormArray[i]);
        //     orderFormObj[key] = orderFormArray[i][key];
        // }
        // Teacher solution (better)
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderForm: formData
        }
        axiosOrder.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/orders');
            })
            .catch(err => {
                console.log(err);
            });
    }

    inputChangeHandler = (event) => {
        const name = event.target.name;
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[name]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.validation, event.target.value);
        updatedFormElement.touched = true;
        updatedOrderForm[name] = updatedFormElement;

        let formIsValid = true;
        for (let formIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[formIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formValid: formIsValid
        });
    }

    render() {
        //console.log(this.state.formValid);
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => {
                    //console.log(formElement);
                    return (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            name={formElement.id}
                            invalid={!formElement.config.valid}
                            shouldCheckValid={formElement.config.validation}
                            touched={formElement.config.touched}
                            onChanged={this.inputChangeHandler} />
                    )
                })}
                <Button
                    buttonType='Success'
                    disabled={!this.state.formValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;