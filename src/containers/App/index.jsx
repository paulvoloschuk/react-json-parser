import React, {Component} from 'react'
import {FullScreenDropZone} from 'containers'
import {Viewer} from 'modules'
import logo from './logo.svg'
import './styles.css'

export const HOURS = new Date().getHours()

class App extends Component {
  state = {file: null, day: HOURS > 6 && HOURS < 19 }
  handleDrop = file => this.setState(state => ({...state, file}))
  switchTheme = () => this.setState(state => ({...state, day: !state.day}))

  render () {
    const {file, day} = this.state,
          theme = day ? 'light' : 'dark'

    return (
      <div className={`app app--${theme}`}>
        <header className="app__header">
          <img src={logo} className="app__logo" alt="logo"/>
          <h1 className="app__title">Welcome to <code>react-json-viewer</code></h1>
          <button onClick={this.switchTheme}>
            click to switch {theme} theme
          </button>
        </header>
        <div className="app__intro">
          <FullScreenDropZone onDrop={this.handleDrop}>
            {file && <Viewer theme={theme} dataUrl={file.preview}/>}
          </FullScreenDropZone>
        </div>
      </div>
    )
  }
}

export default App
