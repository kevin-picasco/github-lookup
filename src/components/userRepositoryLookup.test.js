import React from 'react';
import { shallow } from 'enzyme';
import UserRepositoryLookup from "./userRepositoryLookup";

describe('userRepositoryLookup', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('render <UserRepositoryLookup> correctly when loadOnInit prop is not specified', () => {
        const component = shallow(<UserRepositoryLookup />);

        expect(component).toMatchSnapshot();
    });

    it('render <UserRepositoryLookup> correctly when loadOnInit is set to "true"', () => {
        const component = shallow(<UserRepositoryLookup loadOnInit={true} />);

        expect(component).toMatchSnapshot();
    });

    it('update $username state when username input changes its value', () => {
        const mockData = 'kevin-picasco';

        const component = shallow(<UserRepositoryLookup />);

        component.find('#github-username').at(0).props().onChange({ target: { value: mockData } });

        expect(setState).toHaveBeenCalledWith(mockData);
    });

    it('update $sort state when github-sort select changes its value', () => {
        const mockData = 'created_at';

        const component = shallow(<UserRepositoryLookup />);

        component.find('#github-sort').at(0).props().onChange({ target: { value: mockData } });

        expect(setState).toHaveBeenCalledWith(mockData);
    });

    it('update $isDescDirection state when github-sort-direction-asc button is clicked', () => {
        const component = shallow(<UserRepositoryLookup />);

        component.find('#github-sort-direction-asc').at(0).props().onClick();

        expect(setState).toHaveBeenCalledWith(true);
    });

    it('render result correctly when frm-repository-lookup-filter form is submitted', () => {
        const component = shallow(<UserRepositoryLookup />);

        component.find('#frm-repository-lookup-filter').at(0).props().onSubmit();

        expect(component).toMatchSnapshot();
    });
})