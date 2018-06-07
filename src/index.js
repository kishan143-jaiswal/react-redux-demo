import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Routers from './Components/router'
import store from './store'



ReactDOM.render(
<Provider store={store}>
  <Routers/>
  </Provider>, document.getElementById('root'));

