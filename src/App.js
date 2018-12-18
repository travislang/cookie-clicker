import React, { Component } from 'react';

const getCookie = (cookieName) => {
    // Get name followed by anything except a semicolon
    const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

class App extends Component {
    state = {
        clickCount: getCookie('count') || 0,
        usernameIsEditable: false,
        username: getCookie('username') ||''
    }

    handleClick = () => {
        const newCount = Number(this.state.clickCount) + 1;
        document.cookie = `count=${newCount}`;
        this.setState({
            clickCount: newCount,
        });
    }

    editUsername = () => {
        this.setState({
            usernameIsEditable: true,
        });
    }

    saveUsername = () => {
        this.setState({
            usernameIsEditable: false,
        });
        document.cookie = `username=${this.state.username}`;
    }

    handleChange = ({target}) => {
        this.setState({
            username: target.value
        })
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Click the Cookie!!</h1>
                    <p>
                        Username: 
                        {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
                        {this.state.usernameIsEditable ?
                            <div>
                                <input value={this.state.username} onChange={this.handleChange} />
                                <button onClick={this.saveUsername}>Save Username</button>
                            </div>
                             :
                            <div>
                                {this.state.username}
                                <button onClick={this.editUsername}>Edit Username</button>
                            </div>
                        }
                    </p>
                    <p>{this.state.clickCount}</p>
                    <span
                        role="img"
                        aria-label="cookie"
                        style={{ fontSize: '100px', cursor: 'pointer' }}
                        onClick={this.handleClick}
                    >
                        🍪
          </span>
                </center>
            </div>
        );
    }
}

export default App;
