import { shallow } from 'enzyme';
import Node from './Node';
import React from 'react';

let wrapper
const props = {
    node: {
        path: 'rasmus/mosca',
        type: 'folder',
        children: [],
        level: 1,
        showContent: false
    },
    getSubFolders: jest.fn(),
    level: 1,
    toggleFolder: jest.fn()

}

describe('Test case for testing Node component', () => {
    beforeEach(() => {
        wrapper = shallow(<Node {...props} />);
    })

    it('Should display the Node component', () => {
        expect(wrapper.find('div')).toHaveLength(1);
        expect(wrapper.find('StyledNode')).toHaveLength(1);
        expect(wrapper.find('StyledIcon')).toHaveLength(2);
        expect(wrapper.find('span')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    })
    it('Should display the Node component', () => {
       let clickedNode = props.node
        wrapper.find('StyledIcon', {clickedNode}).at(0).simulate('click')
        expect(wrapper).toMatchSnapshot();
    })

})