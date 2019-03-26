import React, { Component } from 'react';
import { Form, Button, ButtonGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

class SignInForm extends Component {

    render(){

        let containerStyle = {
            width: '40%',
            height: '50%',
            border: '1px solid gray',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px lightgray',
            padding: '25px'
        }
        return(
            <Container style={containerStyle}>
                <Form>
                    <ButtonGroup size="lg">
                        <Button>First Time</Button>
                        <Button>Returning</Button>
                    </ButtonGroup>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text autocomplete="false" className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default SignInForm;