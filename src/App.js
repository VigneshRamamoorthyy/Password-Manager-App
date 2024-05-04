import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
    searchValue: '',
    isTrue: false,
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const initial = username[0]

    const initialBackground = colorList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: uuidv4(),
      websiteValue: website,
      usernameValue: username,
      initialValue: initial,
      initialBackgroundValue: initialBackground,
      passwordValue: password,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      searchValue: '',
    }))
  }

  searchList = event => {
    this.setState({
      searchValue: event.target.value,
    })
    console.log(event.target.value)
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({
        isShow: true,
      })
    } else {
      this.setState({
        isShow: false,
      })
    }
  }

  deletePassword = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {website, username, password, isShow, latestList, searchValue} =
      this.state
    let {isTrue} = this.state

    const newList = latestList.filter(eachValue =>
      eachValue.websiteValue.toLowerCase().includes(searchValue.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="sub-div-1-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            className="password-manager-img"
            alt="password manager"
          />
          <form
            className="new-password-container"
            onSubmit={this.onAddPassword}
          >
            <h1 className="new-password-heading">Add New Password</h1>
            <div className="input-field-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-field-img"
              />

              <input
                type="text"
                className="input-field"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>

            <div className="input-field-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="input-field-img"
              />

              <input
                type="text"
                className="input-field"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>

            <div className="input-field-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-field-img"
              />

              <input
                type="password"
                className="input-field"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
        </div>

        <div className="sub-div-2-container">
          <div className="password-search-container">
            <div className="password-count-container">
              <h1 className="your-password-text">Your Passwords</h1>
              <p className="password-count">{newList.length}</p>
            </div>

            <div className="search-field-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-field-img"
              />

              <input
                type="search"
                className="search-input-field"
                placeholder="Search"
                onChange={this.searchList}
                value={searchValue}
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="check"
              className="checkbox"
              onChange={this.showPassword}
            />
            <label className="label-password" htmlFor="check">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                className="no-password-img"
                alt="no passwords"
              />
              <p className="no-password-text">No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul className="password-lists-container">
              {newList.map(eachValue => (
                <li
                  className="password-list"
                  key={eachValue.id}
                  id={eachValue.id}
                >
                  <div className="initial-content-container">
                    <p
                      className={`initial ${eachValue.initialBackgroundValue}`}
                    >
                      {eachValue.initialValue}
                    </p>
                    <div className="list-content-container">
                      <p className="website-text">{eachValue.websiteValue}</p>
                      <p className="username">{eachValue.usernameValue}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          className="stars-img"
                          alt="stars"
                        />
                      )}

                      {isShow && (
                        <p className="username">{eachValue.passwordValue}</p>
                      )}
                    </div>
                  </div>

                  <button
                    className="delete-btn"
                    type="button"
                    data-testid="delete"
                    onClick={() => this.deletePassword(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
