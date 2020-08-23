import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import baseSaga from "../saga/rootSaga";
import downloadSaga from "../saga/download";
import userReducer from "../reducers/usersReducer";
import createSagaMiddleware from "redux-saga";
import dynamicSagaHelper from "../utils/dynamicSagaHelper";


const composeEnhancers =
    typeof window === "object" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const rootSaga = dynamicSagaHelper(baseSaga, downloadSaga);

const createStore = () => {

    const sagaMiddleware = createSagaMiddleware();
    const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
    const store = createStore(userReducer, enhancer );
    return { ...store,
             runSaga:sagaMiddleware.run(rootSaga)
    };
};

export default createStore;
