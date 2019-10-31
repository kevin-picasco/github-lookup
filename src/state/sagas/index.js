import { all } from 'redux-saga/effects';
import { watchGetUserRepositories } from './userRepositorySaga';

export default function* rootSaga() {
    yield all([
        watchGetUserRepositories()
    ]);
}