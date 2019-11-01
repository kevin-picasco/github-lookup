import format from 'string-format';
import { put, takeEvery } from 'redux-saga/effects';
import * as Constant from '../../utils/constant';
import * as Action from '../actions/userRepositoryAction';

export function* getUserRepositories(action) {
    try {
        // Validation
        if (!action || !action.filter || !action.filter.username || !action.filter.username || action.filter.username.length === 0) {
            yield put(Action.getUserRepositoriesFailed(format(Constant.MESSAGE_EMPTY, 'Username')));
            return;
        }

        let url = `${Constant.GITHUB_API_URL}/users/${action.filter.username}/repos`;

        let queryStrings = [];

        if (action.filter.sort && action.filter.sort.length > 0) {
            queryStrings.push(`sort=${action.filter.sort}`);
        }

        if (action.filter.isDescDirection != null) {
            queryStrings.push(`direction=${action.filter.isDescDirection ? Constant.GITHUB_API_SORT_DIRECTION_DESC : Constant.GITHUB_API_SORT_DIRECTION_ASC}`);
        }

        if (queryStrings.length > 0) {
            url += `?${queryStrings.join('&')}`;
        }

        const resJson = yield fetch(url)
            .then(res => res.json());

        if (Array.isArray(resJson)) {
            yield put(Action.getUserRepositoriesSuccess(resJson));
        } else if (resJson.message && resJson.message.length && resJson.message.length > 0) {
            yield put(Action.getUserRepositoriesFailed(resJson.message));
        } else {
            yield put(Action.getUserRepositoriesFailed(format(Constant.MESSAGE_NOT_FOUND, 'User')));
        }
    } catch (err) {
        // Hide actual err from end-user
        yield put(Action.getUserRepositoriesFailed(format(Constant.MESSAGE_NOT_FOUND, 'User')));
    }
}

export function* watchGetUserRepositories() {
    yield takeEvery(Action.GET_USER_REPOSITORIES, getUserRepositories);
}