import React from 'react';
import '/Users/backk/Desktop/OIT Spring 2020/my-app/src/App.css';
import Button from 'react-bootstrap/Button';
import {Component} from "react";
import PropTypes from 'prop-types';

export default class Home extends Component {
    static propTypes = {
        switchToTimer: PropTypes.func.isRequired,
        switchToEdit: PropTypes.func.isRequired,
        switchToBooks: PropTypes.func.isRequired,
    }

    render() {
        return(
            <div className = "Home_Top">
                <Button 
                    variant="primary" 
                    onClick={this.props.switchToEdit}
                >
                    Edit Calendar
                </Button>

                <Button 
                    variant="primary" 
                    onClick={this.props.switchToTimer}
                >
                    Work Timer
                </Button>

                <Button 
                    variant="primary" 
                    onClick={this.props.switchToBooks}
                >
                    Textbooks & Readings
                </Button>

            </div>
        );
    }
}

