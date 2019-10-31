import React from 'react';
import { useLink } from 'valuelink';
import UserRepositoryList from './userRepositoryList';

export const UserRepositoryLookup = ({ loadOnInit = false }) => {
    const $filter = useLink({ username: '', sort: '', sortDirection: '' });
    const $loadOnInit = useLink(loadOnInit);
    const usernameInputEl = React.useRef();

    return (
        <div>
            <input ref={usernameInputEl} placeholder="Start typing..." />
            <button onClick={() => { if ($loadOnInit.value !== true) $loadOnInit.set(true); $filter.set({ username: usernameInputEl.current.value }); }}>Search</button>
            {
                $loadOnInit.value === true ?
                    <UserRepositoryList filter={$filter.value} /> : void 0
            }
        </div>
    );
}