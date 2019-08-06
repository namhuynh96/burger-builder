import * as actionTypes from '../actions';
import axios from '../../axios/axios-order';

const initialState = {
    ingredients: { cheese: 0, bacon: 0, meat: 0, salad: 0 },
    price: 4,
    purchasable: false
}

const INGREDIENTS_PRICE = {
    meat: 0.8,
    cheese: 0.4,
    bacon: 0.5,
    salad: 0.6
}

const loadIngredientsHandler = () => {
    var reqest = axios.get('https://react-my-burger-27f38.firebaseio.com/ingredients.json')
        .then(res => {
            return res;
        })
        .catch(err => {
            throw err;
        });
    return reqest
}

const purchasableHandler = (ing) => {
    const sum = Object.keys(ing).map((ingKey) => {
        return ing[ingKey]
    }).reduce((acc, crr) => acc + crr, 0);
    return sum > 0;
}

const ingredients = (state = initialState, action) => {
    let ing = { ...state.ingredients };
    let oldPrice = state.price;
    let updatedPrice = 0;
    switch (action.type) {
        // case actionTypes.LOAD_INGREDIENT:
        //     console.log(loadIngredientsHandler());
        
        case actionTypes.ADD_INGREDIENT:
            ing[action.ingType]++;
            updatedPrice = INGREDIENTS_PRICE[action.ingType] + oldPrice;
            return {
                ...state,
                ingredients: ing,
                price: updatedPrice,
                purchasable: purchasableHandler(ing)
            }
        case actionTypes.REMOVE_INGREDIENT:
            if (ing[action.ingType] <= 0) {
                return;
            }
            ing[action.ingType]--;
            updatedPrice = oldPrice - INGREDIENTS_PRICE[action.ingType];
            return {
                ...state,
                ingredients: ing,
                price: updatedPrice,
                purchasable: purchasableHandler(ing)
            }

    }
    return state;
}

export default ingredients;