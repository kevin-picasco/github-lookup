import React, { useReducer } from 'react';
import { useIO, useLink, useSafeLink } from 'valuelink';
import { useSelector, useDispatch } from 'react-redux';
import simpleReducer from './reducers/simpleReducer';

export const RepositoryLookup = ({ loadOnInit = false }) => {
    const $filter = useLink({ username: '', sort: '', sortDirection: '' });
    const $loadOnInit = useLink(loadOnInit);
    const usernameInputEl = React.useRef();

    return (
        <div>
            <input ref={usernameInputEl} placeholder="Start typing..." />
            <button onClick={() => { if ($loadOnInit.value !== true) $loadOnInit.set(true); $filter.set({ username: usernameInputEl.current.value }); }}>Search</button>
            {
                $loadOnInit.value === true ?
                    <RepositoryList filter={$filter.value} /> : void 0
            }
        </div>
    );
}

const RepositoryList = ({ filter }) => {
    const $repositories = useSafeLink([]);

    const ioComplete = useIO(async () => {
        $repositories.set(await fetchUserRepository(filter));
    }, [filter]);

    const increase = () => ({ type: "INCREASE_COUNTER" });

    const [counter, dispatch] = useReducer(simpleReducer, { counter: 0 });

    return (
        <div>
            the counter is {counter.counter}
            <button onClick={() => dispatch(increase())}>increase</button>

            <ul className="users-suggestions">
                {ioComplete ? $repositories.value.map(repository => (
                    <li key={repository.id}>
                        {repository.name}
                        <br />
                        {repository.created_at}
                        <br />
                        {repository.html_url}
                    </li>
                )) : 'Loading...'}
            </ul>
        </div>
    )
}

function fetchUserRepository(filter) {
    return fetch(`https://api.github.com/users/${filter.username}/repos`).then(res => res.json());
}