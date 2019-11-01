import React from 'react';
import { useLink } from 'valuelink';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import UserRepositoryList from './userRepositoryList';

const useStyles = makeStyles(theme => ({
    root: {
        '& > .fa': {
            margin: theme.spacing(2),
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing(5)
    },
    textField: {
        margin: theme.spacing(1),
        width: 200
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    sortButton: {
        margin: theme.spacing(2),
        width: 100
    }
}));

const UserRepositoryLookup = ({ loadOnInit = false }) => {
    const classes = useStyles();

    // TODO: Load from some source?
    const sortableFields = [
        { text: 'Name', value: 'name' },
        { text: 'Creation Date', value: 'created_at' }
    ];

    const $loadOnInit = useLink(loadOnInit);
    const $filter = useLink({ username: '', sort: sortableFields[0].value, isDescDirection: false });
    const $username = useLink($filter.value.username);
    const $sort = useLink($filter.value.sort);
    const $isDescDirection = useLink($filter.value.isDescDirection);

    const syncFilter = () => {
        if ($loadOnInit.value !== true) {
            $loadOnInit.set(true);
        }

        if (!$username.value || $username.value.length === 0) {
            return;
        }

        $filter.set({ ...$filter.value, username: $username.value, sort: $sort.value, isDescDirection: $isDescDirection.value });
    };

    const handleSubmit = event => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        syncFilter();
    }

    const handleUsernameInputKeypress = event => {
        if (event.which === 13 && !event.shiftKey) {
            syncFilter();
        }
    }

    const handleSortChange = event => {
        $sort.set(event.target.value);
    };

    return (
        <div>
            <h1>GitHub Repositories Lookup</h1>
            <form id="frm-repository-lookup-filter" className={classes.container} onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <TextField
                        required
                        autoFocus
                        id="github-username"
                        label="Username"
                        defaultValue={$username.value}
                        onChange={e => $username.set(e.target.value)}
                        onKeyPress={handleUsernameInputKeypress}
                        className={classes.textField}
                        margin="normal"
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="github-sort-label">Sort</InputLabel>
                        <Select
                            labelId="github-sort-label"
                            id="github-sort"
                            value={$sort.value}
                            onChange={handleSortChange}
                        >
                            {
                                sortableFields.map(sortableFields => <MenuItem key={sortableFields.value} value={sortableFields.value}>{sortableFields.text}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.root}>
                    {
                        $isDescDirection.value === true
                            ? <Button id="github-sort-direction-desc" variant="outlined" color="default" className={classes.sortButton} onClick={() => { $isDescDirection.set(false); }}>
                                <Icon className="fa fa-sort-amount-down" /> &nbsp;&nbsp;Desc
                            </Button>
                            : <Button id="github-sort-direction-asc" variant="outlined" color="default" className={classes.sortButton} onClick={() => { $isDescDirection.set(true); }}>
                                <Icon className="fa fa-sort-amount-down-alt" /> &nbsp;&nbsp;Asc
                            </Button>
                    }
                </div>
                <div style={{ width: '100%', textAlign: 'left', marginTop: '10px' }}>
                    <Button id="btn-search" type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </div>
            </form>
            {
                $loadOnInit.value === true
                    ? <UserRepositoryList filter={$filter.value} />
                    : void 0
            }
        </div >
    );
}

export default UserRepositoryLookup;