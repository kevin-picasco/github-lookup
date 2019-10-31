import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import sagaMiddleware from './middlewares/saga';
import rootSaga from './sagas';

export default function configureStore() {
    const middleware = applyMiddleware(sagaMiddleware)
    const store = createStore(rootReducer, middleware);
    
    sagaMiddleware.run(rootSaga);

    return store;
}