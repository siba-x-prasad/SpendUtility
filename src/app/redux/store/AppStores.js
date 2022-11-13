import { createStore, combineReducers } from 'redux';
import categoryReducer from '../reducers/CategoryReducer';
const rootReducer = combineReducers({
  category: categoryReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;