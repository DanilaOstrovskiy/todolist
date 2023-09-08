import React from 'react'
import {Provider} from "react-redux";
import {store} from "./store";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import App from './App';


export default {
    title: "App stories",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppBaseExample = () => {
    return <Provider store={store}><App/></Provider>

        }
