// dashboardStore.js

import { createStore } from 'redux';
import dashboardReducer from './reducer/dashboardReducer';

// Create and configure the Redux store
const dashboardStore = createStore(dashboardReducer);

export default dashboardStore;
