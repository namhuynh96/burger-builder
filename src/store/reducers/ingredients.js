import * as actionTypes from '../actions';
import axios from '../../axios/axios-order';

const initialState = {
    ingredients: {cheese: 0, bacon: 1, salad: 1, meat: 1},
    price: 4,
    purchasable: false
}

const INGREDIENTS_PRICE = {
    meat: 0.8,
    cheese: 0.4,
    bacon: 0.5,
    salad: 0.6
}

const ingredients = (state = initialState, action) => {
    const purchasableHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map((ingKey) => {
            return ingredients[ingKey]
        }).reduce((acc, crr) => acc + crr, 0);
        return {
            ...state,
            purchasable: sum > 0
        };
    };

    switch (action.type) {
        case actionTypes.LOAD_INGREDIENT:
            axios.get('https://react-my-burger-27f38.firebaseio.com/ingredients.json')
                .then(res => {
                    console.log(res.data);
                    return {
                        ...state,
                        ingredients: res.data 
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        case actionTypes.ADD_INGREDIENT:
            let ing = { ...state.ingredients };
            ing[action.ingType]++;
            let oldPrice = state.price;
            let updatedPrice = INGREDIENTS_PRICE[action.ingType] + oldPrice;
            purchasableHandler(ing);
            // console.log(updatedPrice);
            return {
                ingredients: ing,
                price: updatedPrice
            }
        //case actionTypes.REMOVE_INGREDIENTS:


    }
    return state;
}

export default ingredients;