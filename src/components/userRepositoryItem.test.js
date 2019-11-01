import React from 'react';
import { mount } from 'enzyme';
import UserRepositoryItem from "./userRepositoryItem";

describe('userRepositoryItem', () => {
    it('render <UserRepositoryItem> correctly', () => {
        const mockData = {
            id: 218454167,
            name: 'github-lookup',
            created_at: '2019-10-30T06:01:25Z'
        };

        const component = mount(<UserRepositoryItem userRepository={mockData} />);

        expect(component).toMatchSnapshot();
    });
})