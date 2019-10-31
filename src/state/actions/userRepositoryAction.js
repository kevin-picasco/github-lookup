export const GET_USER_REPOSITORIES = 'GET_USER_REPOSITORIES';
export const GET_USER_REPOSITORIES_SUCCESS = 'GET_USER_REPOSITORIES_SUCCESS';
export const GET_USER_REPOSITORIES_FAILED = 'GET_USER_REPOSITORIES_FAILED';

export const getUserRepositories = filter => ({
    type: GET_USER_REPOSITORIES,
    filter: filter
});

export const getUserRepositoriesSuccess = data => ({
    type: GET_USER_REPOSITORIES_SUCCESS,
    data: data
});

export const getUserRepositoriesFailed = error => ({
    type: GET_USER_REPOSITORIES_FAILED,
    error: error
});