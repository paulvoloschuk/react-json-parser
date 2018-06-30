import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './'

it('renders without crashing', () => {
  shallow(<App />)
})

it('renders theme correctly', () => {
  const component = shallow(<App />),
        container = component.find('.app'),
        checkClassName = () => expect(
          component.hasClass(
            component.instance().state.day
              ? 'app--light'
              : 'app--dark'
          )
        ).toBe(true)

  checkClassName()
  component.instance().switchTheme()
  component.update()
  checkClassName()
})

it('stores file properly', () => {
  const component = shallow(<App />),
        file = new File(["foo"], "foo.txt", {
          type: "application/json",
        })

  expect(component.instance().state.file).toBe(null)
  component.instance().handleDrop(file)
  expect(component.instance().state.file).toBe(file)
})
