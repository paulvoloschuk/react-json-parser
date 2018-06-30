import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, render } from 'enzyme'

import Dropzone from './'

it('renders without crashing', () => {
  shallow(<Dropzone />)
})
