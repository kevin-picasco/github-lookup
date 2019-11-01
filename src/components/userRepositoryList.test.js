import React from 'react';
import format from 'string-format';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureStore from "redux-mock-store";
import * as Constant from '../utils/constant';
import UserRepositoryList from "./userRepositoryList";

describe('userRepositoryList', () => {
    it('render <UserRepositoryList> correctly when loading is in progress', () => {
        const mockStore = configureStore();

        const mockData = mockStore({
            userRepositoryReducer: {
                data: null,
                error: null,
                isLoading: true
            }
        });

        const component = shallow(
            <Provider store={mockData}>
                <UserRepositoryList />
            </Provider>);

        expect(component).toMatchSnapshot();
    });

    it('render <UserRepositoryList> correctly when there is an error', () => {
        const mockStore = configureStore();

        const mockData = mockStore({
            userRepositoryReducer: {
                data: null,
                error: format(Constant.MESSAGE_NOT_FOUND, 'User'),
                isLoading: false
            }
        });

        const component = shallow(
            <Provider store={mockData}>
                <UserRepositoryList />
            </Provider>);

        expect(component).toMatchSnapshot();
    });

    it('render <UserRepositoryList> correctly when userRepositories are empty', () => {
        const mockStore = configureStore();

        const mockData = mockStore({
            userRepositoryReducer: {
                data: [],
                error: null,
                isLoading: false
            }
        });

        const component = shallow(
            <Provider store={mockData}>
                <UserRepositoryList />
            </Provider>);

        expect(component).toMatchSnapshot();
    });

    it('render <UserRepositoryList> correctly when userRepositories have data', () => {
        const mockStore = configureStore();

        const mockData = mockStore({
            userRepositoryReducer: {
                data: [
                    {
                        id: 218454167,
                        name: 'github-lookup',
                        created_at: '2019-10-30T06:01:25Z'
                    }
                ],
                error: null,
                isLoading: false
            }
        });

        const component = mount(
            <Provider store={mockData}>
                <UserRepositoryList />
            </Provider>);

        expect(component).toMatchSnapshot();
    });
})