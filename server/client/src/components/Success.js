import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

export default class Success extends Component {


    render(props) {

    

        const { show, resetForm } = this.props
      
        return (
        
            <Alert show={show} variant="success">
                <Alert.Heading>Signed in... Thanks!</Alert.Heading>
          </Alert>
          
        
      );
}

}



  