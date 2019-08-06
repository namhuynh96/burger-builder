import * as actionTypes from '../actions';
import axios from '../../axios/axios-order';

const initialState = {
    ingredients: { cheese: 0, bacon: 0, meat: 0, salad: 0 },
    price: 4
}

const INGREDIENTS_PRICE = {
    meat: 0.8,
    cheese: 0.4,
    bacon: 0.5,
    salad: 0.6
}

// const loadIngredientsHandler = () => {
//     var reqest = axios.get('https://react-my-burger-27f38.firebaseio.com/ingredients.json')
//         .then(res => {
//             return res;
//         })
//         .catch(err => {
//             throw err;
//         });
//     return reqest
// }

const purchasableHandler = (ing) => {
    const sum = Object.keys(ing).map((ingKey) => {
        return ing[ingKey]
    }).reduce((acc, crr) => acc + crr, 0);
    return sum > 0;
}

const ingredients = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.LOAD_INGREDIENT:
        //     console.log(loadIngredientsHandler());
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] + 1
                },
                price: state.price + INGREDIENTS_PRICE[action.ingType]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] - 1
                },
                price: state.price - INGREDIENTS_PRICE[action.ingType]
            }
    }
    return state;
}

export default ingredients;