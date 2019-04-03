import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

export default class Failure extends Component {

    render(props) {

        const { show, errorText } = this.props
      
        return (
        
            <Alert show={show} variant="danger">
                <Alert.Heading>{errorText}</Alert.Heading>
          </Alert>
          
        
        );
    }

};