import React from "react"
import ReactDOM from "react-dom"

import "./index.css"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { compose, createStore } from "redux"

import reportWebVitals from "./reportWebVitals"
import App from "./App"
import reducers from "./redux/reducers"
import middlewares from "./redux/middlewares"
// import { gql } from "@apollo/client"
// import { Query } from "@apollo/client/react/components"

//create appolo Client
export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
})

//create redux store
const store = createStore(reducers, compose(middlewares))
// const categotiesQuery = gql`query categories{
//   categories{
//     name
//   }
// }`;
// client.query({
//   query: categotiesQuery,
// }).then(data=>{if(data.loading === false){console.log(data)}})
const app = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
)
ReactDOM.render(app, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
