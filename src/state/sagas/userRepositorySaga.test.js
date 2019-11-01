import format from 'string-format';
import { put, takeEvery } from 'redux-saga/effects';
import * as Constant from '../../utils/constant';
import * as Action from '../actions/userRepositoryAction';
import * as Saga from './userRepositorySaga';

describe('userRepositorySaga', () => {
    it(`dispatch action "${Action.GET_USER_REPOSITORIES}"`, () => {
        const generator = Saga.watchGetUserRepositories();

        expect(generator.next().value)
            .toEqual(takeEvery(Action.GET_USER_REPOSITORIES, Saga.getUserRepositories));

        expect(generator.next().done).toBeTruthy();
    });

    it(`dispatch action "${Action.GET_USER_REPOSITORIES_FAILED}" with result "${format(Constant.MESSAGE_EMPTY, 'Username')}" when action is null`, () => {
        const initialAction = null;
        const generator = Saga.getUserRepositories(initialAction);

        expect(generator.next().value)
            .toEqual(put(Action.getUserRepositoriesFailed(format(Constant.MESSAGE_EMPTY, 'Username'))));

        expect(generator.next().done).toBeTruthy();
    });

    it(`dispatch action "${Action.GET_USER_REPOSITORIES_FAILED}" with result "${format(Constant.MESSAGE_EMPTY, 'Username')}" when action filter is undefined`, () => {
        const initialAction = {};
        const generator = Saga.getUserRepositories(initialAction);

        expect(generator.next().value)
            .toEqual(put(Action.getUserRepositoriesFailed(format(Constant.MESSAGE_EMPTY, 'Username'))));

        expect(generator.next().done).toBeTruthy();
    });

    it(`dispatch action "${Action.GET_USER_REPOSITORIES_FAILED}" with result "${format(Constant.MESSAGE_EMPTY, 'Username')}" when action filter username is undefined`, () => {
        const initialAction = { filter: {} };
        const generator = Saga.getUserRepositories(initialAction);

        expect(generator.next().value)
            .toEqual(put(Action.getUserRepositoriesFailed(format(Constant.MESSAGE_EMPTY, 'Username'))));

        expect(generator.next().done).toBeTruthy();
    });

    it(`dispatch action "${Action.GET_USER_REPOSITORIES_FAILED}" with result "${format(Constant.MESSAGE_EMPTY, 'Username')}" when action filter username is null`, () => {
        const initialAction = { filter: { username: null } };
        const generator = Saga.getUserRepositories(initialAction);

        expect(generator.next().value)
            .toEqual(put(Action.getUserRepositoriesFailed(format(Constant.MESSAGE_EMPTY, 'Username'))));

        expect(generator.next().done).toBeTruthy();
    });

    it(`dispatch action "${Action.GET_USER_REPOSITORIES_FAILED}" with result "${format(Constant.MESSAGE_EMPTY, 'Username')}" when action filter username is empty`, () => {
        const initialAction = { filter: { username: '' } };
        const generator = Saga.getUserRepositories(initialAction);

        expect(generator.next().value)
            .toEqual(put(Action.getUserRepositoriesFailed(format(Constant.MESSAGE_EMPTY, 'Username'))));

        expect(generator.next().done).toBeTruthy();
    });

    it(`dispatch action "${Action.GET_USER_REPOSITORIES_SUCCESS}" with result from fetch user repositories API`, () => {
        const mockData = [
            {
                id: 218454167,
                name: 'github-lookup',
                created_at: '2019-10-30T06:01:25Z'
            }
        ];

        const initialAction = { filter: { username: 'kevin-picasco' } };
        const generator = Saga.getUserRepositories(initialAction);

        generator.next();

        expect(generator.next(mockData).value)
            .toEqual(put(Action.getUserRepositoriesSuccess(mockData)));

        expect(generator.next().done).toBeTruthy();
    });

    it(`dispatch action "${Action.GET_USER_REPOSITORIES_FAILED}" when user not found in API`, () => {
        const mockData = { message: format(Constant.MESSAGE_NOT_FOUND, 'User') };

        const initialAction = { filter: { username: 'usercannotbefoundingithub' } };
        const generator = Saga.getUserRepositories(initialAction);

        generator.next();

        expect(generator.next(mockData).value)
            .toEqual(put(Action.getUserRepositoriesFailed(mockData.message)));

        expect(generator.next().done).toBeTruthy();
    });
})