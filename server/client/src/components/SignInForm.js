import React, { Component } from 'react';
import { Col, Form, Button, ButtonGroup, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

class SignInForm extends Component {

    constructor(){
        super();
        this.state = {
            status: 'returning', //new or returning
            email: '',
            firstName: '',
            lastName: '',
            industry: '',
            companyName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            classification: 'homeowner', // homeowner or professional
            addToEmailList: 'false' 
        }
            

    }



    render(){

        const { status, classification } = this.state;

        let containerStyle = {
            width: '40%',
            height: '50%',
            border: '1px solid gray',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px lightgray',
            padding: '25px'
        }

        console.log(this.state)

        let stateArray = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
        let industryArray = [ "Interior Design", "Architecture", "Fabrication", "Retail", "Construction", "Wholesale"]

        
        

     
        return(
            <Container style={containerStyle}>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="formNewOrRepeat">
                                <ToggleButtonGroup size="lg" toggle="true" name="status" onClick={(e)=>this.setState({status: e.target.value})}>
                                    <ToggleButton variant="outline-primary" value="new">First Time</ToggleButton>
                                    <ToggleButton variant="outline-primary" value="returning">Returning</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formNewOrRepeat">
                                <ToggleButtonGroup size="lg" toggle="true" name="classification" onClick={(e)=>this.setState({classification: e.target.value})}>
                                    <ToggleButton variant="outline-primary" value="homeowner">Homeowner</ToggleButton>
                                    <ToggleButton variant="outline-primary" value="professional">Professional</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    
                    <Form.Group controlId="formBasicEmail" onChange={(e)=>this.setState({email: e.target.value})}>
                        <Form.Control type="email" placeholder="Email Address" />
                        <Form.Text autocomplete="false" className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    {status === 'new' && <>
                    <Form.Group controlId="formName">
                        <Form.Row>
                            <Col>
                                <Form.Control autocomplete="given-name" type="text" placeholder="First Name" onChange={(e)=>this.setState({firstName: e.target.value})}/>
                            </Col>
                            <Col>
                                <Form.Control autocomplete="family-name" type="text" placeholder="Last Name" onChange={(e)=>this.setState({lastName: e.target.value})}/>
                            </Col>                       
                        </Form.Row>
                    </Form.Group>
                    
                    
                    {classification === 'professional' && <>
                    <Form.Group controlId="formIndustry" onChange={(e)=>this.setState({industry: e.target.value})}>
                        <Form.Control as="select" className="text-muted">
                            <option>Industry</option>
                            {industryArray.map(industry=>{
                                return <option>{industry}</option>
                            })}
                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId="formCompanyName" onChange={(e)=>this.setState({companyName: e.target.value})}>
                        <Form.Control type="text" placeholder="Company Name" />
                    </Form.Group>
                    </>
                    }
                    <Form.Group controlId="formAddress" onChange={(e)=>this.setState({address: e.target.value})}>
                        <Form.Control type="text" placeholder="Street" />
                    </Form.Group>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity" onChange={(e)=>this.setState({city: e.target.value})}>
                            <Form.Control placeholder="City" className="text-muted"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState" onChange={(e)=>this.setState({state: e.target.value})}>
                            <Form.Control as="select" className="text-muted">
                                <option>State...</option>
                                {stateArray.map(state => {
                                    return <option>{state}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip" onChange={(e)=>this.setState({zip: e.target.value})}>
                            
                            <Form.Control placeholder="Zip" className="text-muted"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Get Email Updates for Future WH Sales" onChange={(e)=>this.setState({zip: e.target.value})}/>
                    </Form.Group>
                    </>}
                    <Button variant="primary" size="lg" type="submit">
                        Sign In
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default SignInForm;