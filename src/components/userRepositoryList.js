import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserRepositories } from '../state/actions/userRepositoryAction';
import Moment from 'react-moment';

const UserRepository = ({ userRepository }) => {
    return (
        <div>
            {userRepository.name}
            <br />
            <Moment format="D MMM YYYY hh:mm A">{userRepository.created_at}</Moment>
            <br />
            <a
                className="App-link"
                href={userRepository.html_url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {userRepository.html_url}
            </a>
        </div>
    )
}

let UserRepositoryList = ({ filter, userRepositories, getUserRepositories }) => {
    useEffect(() => {
        getUserRepositories(filter);
    }, [filter]);

    return (
        <div>
            {
                userRepositories.isLoading === true
                    ? 'Loading...'
                    : userRepositories.error
                        ? `${userRepositories.error}`
                        : userRepositories.data && userRepositories.data.length
                            ? userRepositories.data.map(userRepository =>
                                <UserRepository key={userRepository.id} userRepository={userRepository}></UserRepository>)
                            : 'User has no repository'
            }
        </div >
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