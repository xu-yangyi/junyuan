import { createStore, applyMiddleware,combineReducers } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {User} from "./redux/users"
import {Article} from './redux/articles'

const reducer = combineReducers({User,Article})

export function initializeStore (init) {
    return createStore(reducer,init, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

