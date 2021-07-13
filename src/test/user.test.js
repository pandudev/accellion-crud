import User from '../pages/User';
import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer'
import Table from '../components/Table';

describe("User Testing", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<User />)
    });

    const users = [
        {
            id: '123aaa321',
            username: 'User 1',
            email: 'user1@test.com',
            registered: '2021-07-13T05:24:52.000Z'
        },
        {
            id: '123aaa322',
            username: 'User 2',
            email: 'user2@test.com',
            registered: '2021-07-13T05:14:54.000Z'
        },
        {
            id: '123aaa323',
            username: 'User 3',
            email: 'user3@test.com',
            registered: '2021-07-12T21:09:56.000Z'
        }
    ];

    const columns = [
        {
            field: 'username',
            label: 'User name',
            sortable: true
        },
        {
            field: 'email',
            label: 'Email',
            sortable: true
        },
        {
            field: 'score',
            label: 'Score',
            sortable: true,
            isNumber: true
        },
        {
            field: 'registered',
            label: 'Registered',
            sortable: true
        },
        {
            field: 'action',
            label: '',
            sortable: false
        }
    ]

    test("renders the title of user page", () => {
        expect(wrapper.find('h1').text()).toContain("Frontend Developer Test")
    })

    test("renders table without data", () => {
        const component = renderer.create(<Table data={[]}/>);
        expect(component).toMatchSnapshot();
    })

    test("renders table with data", () => {
        const component = renderer.create(<Table data={users} />);
        const tableWrapper = shallow(<Table data={users}/>)
        console.log(tableWrapper.debug());
        expect(component).toMatchSnapshot();
    })



})
