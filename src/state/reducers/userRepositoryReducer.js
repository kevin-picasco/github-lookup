import { GET_USER_REPOSITORIES, GET_USER_REPOSITORIES_SUCCESS, GET_USER_REPOSITORIES_FAILED } from '../actions/userRepositoryAction';

export default (state = { isLoading: false, data: null, error: null }, action) => {
    switch (action.type) {
        case GET_USER_REPOSITORIES:
            return { ...state, isLoading: true };
        case GET_USER_REPOSITORIES_SUCCESS:
            return { ...state, data: action.data, error: null, isLoading: false };
        case GET_USER_REPOSITORIES_FAILED:
            return { ...state, data: null, error: action.error, isLoading: false };
        default:
            return state;
    }
}