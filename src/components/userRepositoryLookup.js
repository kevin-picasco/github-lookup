import React from 'react';
import { useLink } from 'valuelink';
import UserRepositoryList from './userRepositoryList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';

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
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    sortButton: {
        margin: theme.spacing(2),
        width: 100
    }
}));

export const UserRepositoryLookup = ({ loadOnInit = false }) => {
    const classes = useStyles();

    // TODO: Load from some source?
    const sortableFields = [
        { text: 'Name', value: 'name' },
        { text: 'Creation Date', value: 'created_at' }
    ];

    const $loadOnInit = useLink(loadOnInit);
    const $filter = useLink({ username: '', sort: null, isDescDirection: false });
    const $username = useLink('');
    const $sort = useLink(sortableFields[0].value);
    const $isDescDirection = useLink(false);

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
        event.preventDefault();

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
            <form className={classes.container} onSubmit={handleSubmit} autoComplete="off">
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
                            ? <Button variant="outlined" color="default" className={classes.sortButton} onClick={() => { $isDescDirection.set(false); }}>
                                <Icon className="fa fa-sort-amount-down" /> &nbsp;&nbsp;Desc
                            </Button>
                            : <Button variant="outlined" color="default" className={classes.sortButton} onClick={() => { $isDescDirection.set(true); }}>
                                <Icon className="fa fa-sort-amount-down-alt" /> &nbsp;&nbsp;Asc
                            </Button>
                    }
                </div>
                <div style={{ width: '100%', textAlign: 'left', marginTop: '10px' }}>
                    <Button type="submit" variant="contained" color="primary">
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