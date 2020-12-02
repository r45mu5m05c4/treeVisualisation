import { shallow } from 'enzyme';
import App from './App';
import React from 'react';
import Tree from './components/Tree/Tree';

describe('Test case for testing login Page', () => {

  it('Should display the Tree in App', () => {
   
      const wrapper = shallow(<App />);
      expect(wrapper.find('div')).toHaveLength(1)
      expect(Tree).toHaveLength(1);
    })
  })