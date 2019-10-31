import { put, takeEvery } from 'redux-saga/effects';
import { GET_USER_REPOSITORIES, getUserRepositoriesSuccess, getUserRepositoriesFailed } from '../actions/userRepositoryAction';
import * as Constant from '../../utils/constant';

const defaultErrorMessage = 'User not found';

function* getUserRepositories(action) {
    try {
        // Validation
        if (!action || !action.filter || !action.filter.username || !action.filter.username || action.filter.username.length == 0) {
            yield put(getUserRepositoriesFailed('Username is empty'));
            return;
        }

        let url = `${Constant.GITHUB_API_URL}/users/${action.filter.username}/repos?`;

        if (action.filter.sort && action.filter.sort.length > 0) {
            url += `sort=${action.filter.sort}`;
        }

        if (action.filter.isDescDirection != null) {
            url += `direction=${action.filter.isDescDirection ? Constant.GITHUB_API_SORT_DIRECTION_DESC : Constant.GITHUB_API_SORT_DIRECTION_ASC}`;
        }

        const resJson = yield fetch(url)
            .then(res => res.json());

        if (Array.isArray(resJson)) {
            yield put(getUserRepositoriesSuccess(resJson));
        } else if (resJson.message && resJson.message.length && resJson.message.length > 0) {
            yield put(getUserRepositoriesFailed(resJson.message));
        } else {
            yield put(getUserRepositoriesFailed(defaultErrorMessage));
        }
    } catch (err) {
        // Hide actual err from end-user
        yield put(getUserRepositoriesFailed(defaultErrorMessage));
    }
}

export function* watchGetUserRepositories() {
    yield takeEvery(GET_USER_REPOSITORIES, getUserRepositories);
}