import React, { Component } from 'react'
import './Header.css';

export class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            time: new Date().toLocaleTimeString(),
            day: new Date().toLocaleDateString(),
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ time: new Date().toLocaleTimeString() })
        }, 1000)
        setInterval(() => {
            this.setState({ day: new Date().toLocaleTimeString() })
        }, 60000)
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        return (
            <>
                <div className="contianer">
                    <h3>
                        {new Date().toLocaleDateString()}
                                &emsp;
                            {this.state.time}
                    </h3>
                </div>
            </>
        );
    }
}

export default Header;
