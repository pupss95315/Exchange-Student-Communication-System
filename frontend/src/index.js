import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
} from "@apollo/client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/'
})
const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/`,
    options: { reconnect: true }
})

const link = split(
// split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    link,
    cache: new InMemoryCache().restore({})
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Switch>
                <App />
            </Switch>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
);



