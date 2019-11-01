import * as Action from './userRepositoryAction';

describe('userRepositoryAction', () => {
    it(`create an action with "${Action.GET_USER_REPOSITORIES}" type`, () => {
        const mockData = {
            type: Action.GET_USER_REPOSITORIES,
            filter: {
                username: 'kevin-picasco',
                sort: 'created_at',
                isDescDirection: true
            }
        };

        expect(Action.getUserRepositories(mockData.filter)).toEqual(mockData);
    });

    it(`create an action with "${Action.GET_USER_REPOSITORIES_SUCCESS}" type`, () => {
        const mockData = {
            type: Action.GET_USER_REPOSITORIES_SUCCESS,
            data: [
                {
                    id: 218454167,
                    name: 'github-lookup',
                    created_at: '2019-10-30T06:01:25Z'
                }
            ]
        };

        expect(Action.getUserRepositoriesSuccess(mockData.data)).toEqual(mockData);
    });

    it(`create an action with "${Action.GET_USER_REPOSITORIES_FAILED}" type`, () => {
        const mockData = {
            type: Action.GET_USER_REPOSITORIES_FAILED,
            error: ''
        };

        expect(Action.getUserRepositoriesFailed(mockData.error)).toEqual(mockData);
    });
})