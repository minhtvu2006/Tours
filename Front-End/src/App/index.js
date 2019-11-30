import React, { Component } from "react";

import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import routes from "../router";
import configStore from "../_redux/configStore.redux";

//Third lib
import { ToastContainer } from "react-toastify";

//style
import "react-toastify/dist/ReactToastify.min.css";
import "antd/dist/antd.less"; //customize theme

//import components:

const store = configStore();

class App extends Component {
   render() {
      return (
         <Router>
            <Provider store={store}>
               {this.showContent(routes)}
               <ToastContainer autoColse={3000} />
            </Provider>
         </Router>
      );
   }

   showContent = routes => {
      var resultPage = null;
      if (routes.length > 0) {
         resultPage = routes.map((route, index) => {
            return (
               <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={props => route.component(props)}
               />
            );
         });
         return <Switch>{resultPage}</Switch>;
      }
   };
}

export default App;
