import { shallow } from 'enzyme';
import Tree from './Tree';
import React from 'react';

let wrapper, instance

describe('Test case for testing Tree component', () => {
    beforeEach(() => {
        wrapper = shallow(<Tree />);
        instance = wrapper.instance();
    })

    it('Should display the Tree component', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    })
    it('Should test the getSubFolders function', () => {
        let mockNode = { children: [] };
        expect(instance.getSubFolders(mockNode)).toEqual(mockNode.children);
    })
    it('Should test the findTopNode function', () => {
        let dirFake = [{
            children: ["dir/marvel", "dir/fact_marvel_beats_dc.txt", "dir/dc"],
            path: "dir",
            topLayer: true,
            type: "folder"
        }]
        jest.spyOn(instance, 'findTopNode');
        instance.findTopNode();
        expect(instance.findTopNode()).toEqual(dirFake);
    })
    it('Should test the folderGenerator function', () => {
        let fakeNodes = {
            'dir': {
                children: [
                    "dir/edument"
                ],
                path: "dir",
                topLayer: true,
                type: "folder",
            },
            'dir/edument': {
                children: [],
                level: 1,
                path: "dir/edument",
                type: "folder"
            }
        }
        let fakeFiles = ['edument']
        instance.folderGenerator(fakeFiles);
        expect(wrapper.state('nodes')).toMatchObject(fakeNodes);
    })
})