import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import ReduxThunk from "redux-thunk"
import PlacesNavigator from "/navigation/PlacesNavigation";
import placesReducer from "/store/reducers/places"
import {initialize} from "/helpers/DB"


const rootReducer = combineReducers({
    places: placesReducer
})

initialize()
    .then(() => {
        console.log("Database initialized")
    })
    .catch((error) => {
        console.log("Database not initialized because of error: " + error)
    })

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator/>
        </Provider>
    );
}
