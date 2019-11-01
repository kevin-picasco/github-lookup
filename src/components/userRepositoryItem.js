import React from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: '#cfcfcf',
        borderBottomStyle: 'solid',
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    desc: {
        color: '#586069',
        paddingTop: '5px'
    },
    tag: {
        color: '#586069',
        fontSize: '12px'
    }
}));

const UserRepositoryItem = ({ userRepository }) => {
    const [spacing] = React.useState(2);
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={0}>
            <Grid item xs={12}>
                <h3>
                    <a
                        className="App-link"
                        href={userRepository.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {userRepository.name}
                    </a>
                </h3>
            </Grid>
            <Grid item xs={12} className={classes.desc}>
                {userRepository.description}
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '8px' }}>
                <Grid container spacing={spacing}>
                    {
                        userRepository.language &&
                        <Grid item className={classes.tag} title="Language">
                            <Icon className="fa fa-circle" style={{ fontSize: '12px', width: 'auto' }} /> {userRepository.language}
                        </Grid>
                    }
                    <Grid item className={classes.tag} title="Fork">
                        <Icon className="fa fa-code-branch" style={{ fontSize: '12px', width: 'auto' }} /> {userRepository.forks}
                    </Grid>
                    <Grid item className={classes.tag} title="Watch">
                        <Icon className="fa fa-eye" style={{ fontSize: '12px', width: 'auto' }} /> {userRepository.watchers}
                    </Grid>
                    <Grid item className={classes.tag} title="Issue">
                        <Icon className="fa fa-exclamation-circle" style={{ fontSize: '12px', width: 'auto' }} /> {userRepository.open_issues}
                    </Grid>
                    <Grid item className={classes.tag}>
                        Created on <Moment format="MMM D, YYYY hh:mm A">{userRepository.created_at}</Moment>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserRepositoryItem;