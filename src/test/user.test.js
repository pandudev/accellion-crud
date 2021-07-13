import User from '../pages/User';
import { mount, shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer'
import Table from '../components/Table';
import Modal from '../components/Modal';
import Form from '../components/Form';

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


describe("rendering components", () => {

    it("rendering user page without crashing", () => {
        shallow(<User/>)
    })

    it("rendering add button without crashing", () => {
        const wrapper = shallow(<User/>);
        const buttonLabel = wrapper.find("#addButton span").text();
        expect(buttonLabel).toEqual("Add User");
    })

    it("rendering modal component without crashing", () => {
        shallow(<Modal />);
    })

    it("rendering table component without crashing", () => {
        shallow(<Table />);
    })

});

describe('passing props', () => {
    const modalWrapper = mount(<Modal isShow={true} isDelete={true} data={users[0]}/>);
    const tableWrapper = mount(<Table data={users}/>);

    it('modal component accepts props', () => {
        const modalBodyText = modalWrapper.find('.modal-body').text();

        expect(modalBodyText).toEqual(`Are you sure to delete ${users[0].username} data?`)
    })

    it('table component accepts props', () => {
        const rows = tableWrapper.find('.tbl-row');
        const secondRowUsername = tableWrapper.find('.tbl-row').at(1).childAt(0).text();
        expect(rows.length).toEqual(users.length);
        expect(secondRowUsername).toEqual(users[1].username);
    })

})

describe('logic', () => {
    const wrapper = shallow(<User/>);
    const modalWrapper = mount(<Modal isShow={true} isDelete={false} data={users[0]}/>);
    
    wrapper.find("#addButton").simulate('click');
    it('add button click - open modal', () => {
        const modalTitleText = modalWrapper.find('.modal-title').at(0).text();
        expect(modalTitleText).toEqual('User Form');
    })
})
