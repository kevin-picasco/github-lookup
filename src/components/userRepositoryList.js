import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserRepositories } from '../state/actions/userRepositoryAction';

let UserRepositoryList = ({ filter, userRepositories, getUserRepositories }) => {
    useEffect(() => {
        getUserRepositories(filter);
    }, [filter]);

    return (
        <div>
            <ul className="users-suggestions">
                {userRepositories.isLoading === true
                    ? 'Loading...'
                    : userRepositories.error
                        ? `${userRepositories.error}`
                        : userRepositories.data.map(userRepository => (
                            <li key={userRepository.id}>
                                {userRepository.name}
                                <br />
                                {userRepository.created_at}
                                <br />
                                <a
                                    className="App-link"
                                    href={userRepository.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {userRepository.html_url}
                                </a>
                            </li>
                        ))}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userRepositories: state.userRepositoryReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserRepositories: filter => dispatch(getUserRepositories(filter))
    }
}

UserRepositoryList = connect(mapStateToProps, mapDispatchToProps)(UserRepositoryList);

export default UserRepositoryList;