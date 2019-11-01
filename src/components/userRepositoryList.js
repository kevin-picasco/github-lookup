import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getUserRepositories } from '../state/actions/userRepositoryAction';
import UserRepositoryItem from './userRepositoryItem';

const useStyles = makeStyles(theme => ({
    rootContainer: {
        margin: theme.spacing(5)
    }
}));

let UserRepositoryList = ({ filter, userRepositories, getUserRepositories }) => {
    const classes = useStyles();

    useEffect(() => {
        getUserRepositories(filter);
    }, [filter]);

    return (
        <div>
            {
                userRepositories
                    ? userRepositories.isLoading && userRepositories.isLoading === true
                        ? 'Loading...'
                        : userRepositories.error
                            ? `${userRepositories.error}`
                            : userRepositories.data && userRepositories.data.length
                                ? <div className={classes.rootContainer}>
                                    {
                                        userRepositories.data.map(userRepository =>
                                            <UserRepositoryItem key={userRepository.id} userRepository={userRepository}></UserRepositoryItem>)
                                    }
                                </div>
                                : 'User has no repository'
                    : void 0
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