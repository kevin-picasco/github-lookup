import { put, takeEvery } from 'redux-saga/effects';
import { GET_USER_REPOSITORIES, getUserRepositoriesSuccess, getUserRepositoriesFailed } from '../actions/userRepositoryAction';

function* getUserRepositories(action) {
    try {
        const resJson = yield fetch(`https://api.github.com/users/${action.filter.username}/repos`)
            .then(res => res.json());

        yield put(getUserRepositoriesSuccess(resJson));
    } catch (err) {
        yield put(getUserRepositoriesFailed(err));
    }
}

export function* watchGetUserRepositories() {
    yield takeEvery(GET_USER_REPOSITORIES, getUserRepositories);
}