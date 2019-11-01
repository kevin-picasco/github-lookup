import format from 'string-format';
import * as Constant from '../../utils/constant';
import * as Action from "../actions/userRepositoryAction";
import userRepositoryReducer from "./userRepositoryReducer";

describe('userRepositoryReducer', () => {
    const initialState = { "isLoading": false, "data": null, "error": null };

    it('return the initial state', () => {
        expect(userRepositoryReducer(undefined, {})).toEqual(initialState);
    });

    it(`handle "${Action.GET_USER_REPOSITORIES}" action when passing undefined state`, () => {
        expect(userRepositoryReducer(undefined, Action.getUserRepositories())).
            toEqual({ ...initialState, isLoading: true });
    });

    it(`handle "${Action.GET_USER_REPOSITORIES}" action when passing empty state`, () => {
        expect(userRepositoryReducer({}, Action.getUserRepositories())).
            toEqual({ isLoading: true });
    });

    it(`handle "${Action.GET_USER_REPOSITORIES_SUCCESS}" action`, () => {
        const mockData = [
            {
                id: 218454167,
                name: 'github-lookup',
                created_at: '2019-10-30T06:01:25Z'
            }
        ];

        expect(userRepositoryReducer({}, Action.getUserRepositoriesSuccess(mockData)))
            .toEqual({ data: mockData, error: null, isLoading: false });
    });

    it(`handle "${Action.GET_USER_REPOSITORIES_FAILED}" action`, () => {
        const mockData = format(Constant.MESSAGE_NOT_FOUND, 'User');

        expect(userRepositoryReducer({}, Action.getUserRepositoriesFailed(mockData)))
            .toEqual({ data: null, error: mockData, isLoading: false });
    });
})