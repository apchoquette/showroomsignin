import React, { Component } from 'react';
import { Col, Form, Button, ButtonGroup, Row, ToggleButtonGroup, ToggleButton, Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import CustomerSummary from './CustomerSummary';
import axios from 'axios';

class SignInForm extends Component {

    constructor(){
        super();
        this.state = {
            status: 'new', //new or returning
            email: '',
            firstName: '',
            lastName: '',
            industry: '',
            companyName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            classification: 'homeowner', // homeowner or professional
            addToEmailList: false,
            modalIsOpen: false,
            validated: false,
            referrer: '',
            emailSubmitted: false,
            loading: false
            
        }

        
    
            

    }

    submitHandler = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ validated: true });
        }else{
            e.preventDefault();
            e.stopPropagation();
            this.setState({ modalIsOpen: true });
        }
        
       
    }

    completeHandler = () => {
        if(this.state.status === 'returning'){

        }else{
            axios.post('/api/showroom-visitor', {
                ...this.state
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

    confirmDataHandler = async () => {
        this.setState({loading: true,
        emailSubmitted: true})
        
        axios.post('/api/showroom-visitor',{...this.state}).then(({data})=> {
            let { Name, Last_Name__c, Industry__c, Company_Name__c, Street__c, City__c, State__c, zip__c, Phone_Number__c, Classification__c, AddToEmailList__c, Referrer__c } = data;
            this.setState({
                firstName: Name,
                lastName: Last_Name__c,
                industry: Industry__c ,
                companyName: Company_Name__c,
                street: Street__c,
                city: City__c,
                state: State__c,
                zip: zip__c,
                phone: Phone_Number__c,
                classification: Classification__c,
                addToEmailList: AddToEmailList__c,
                referrer: Referrer__c
            })
            this.setState({loading: false})
        }).catch(err =>{
            console.log(err)
        })
        
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
       
    }

    disabledHandler = () => {
        let { status,emailSubmitted } = this.state
        if(status === 'new'){
            return false
        }else if(emailSubmitted === true){
            return false
        }
        return true
    }

    


    render(){

        console.log(this.state)

        const { firstName, lastName, companyName, email, street, city, zip, addToEmailList, status, classification, modalIsOpen,validated,state,industry, emailSubmitted, loading, phone } = this.state;
        const { submitHandler, closeModal, completeHandler,disabledHandler, confirmDataHandler } = this

    
        let containerStyle = {
            width: '40%',
            height: '50%',
            border: '1px solid gray',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px lightgray',
            padding: '25px'
        }


        let stateArray = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
        let industryArray = [ "Interior Design", "Architecture", "Fabrication", "Retail", "Construction", "Wholesale"];
        let referralArray = [ "E-mail", "Print Ad", "AKDO Website", "Instagram", "Facebook", "Industry Connection", "Already an AKDO Customer", "AKDO Outdoor Signage", "Other" ]

        return(
            <Container style={containerStyle}>
                <Form noValidate
                    validated={validated}
                    onSubmit={(e)=>submitHandler(e)}
                    >
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="formNewOrRepeat">
                                <ToggleButtonGroup 
                                size="lg" 
                                toggle="true" 
                                name="status" 
                                value={status} 
                                onClick={(e)=>this.setState({status: e.target.value})}>
                                    <ToggleButton variant="outline-primary" value="new">First Time</ToggleButton>
                                    <ToggleButton variant="outline-primary" value="returning">Returning</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formNewOrRepeat">
                                <ToggleButtonGroup 
                                size="lg" 
                                toggle="true" 
                                name="classification" 
                                value={classification} 
                                onClick={(e)=>this.setState({classification: e.target.value})}>
                                    <ToggleButton variant="outline-primary" value="homeowner">Homeowner</ToggleButton>
                                    <ToggleButton variant="outline-primary" value="professional">Professional</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Control 
                        required 
                        type="email" 
                        onChange={(e)=>this.setState({email: e.target.value})} 
                        value={email} 
                        placeholder="Email Address" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                        <Form.Text autoComplete="false" className="text-muted">
                        We'll never share your email with anyone.
                        </Form.Text>
                    </Form.Group>

                    {((status === 'returning' && emailSubmitted === false) || loading === true ) 
                    && <Button 
                    onClick={()=>confirmDataHandler()} 
                    variant="primary" 
                    size="lg">
                        {loading === true ?     
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> :
                        <>
                        <span>Confirm Data</span>
                        <span className="sr-only">Loading...</span>
                        </>}
                    </Button>}
                    
                    {((status === 'new' || emailSubmitted === true) && loading === false) &&
                    
                    <>

                    <Form.Group controlId="formBasicPhoneNumber" >
                        <Form.Control 
                        disabled={disabledHandler()} 
                        onChange={(e)=>this.setState({phone: e.target.value})} 
                        value={phone} 
                        type="text" 
                        placeholder="Phone Number (Optional)" />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Row>
                            <Col>
                                <Form.Control 
                                disabled={disabledHandler()} 
                                required 
                                autoComplete="given-name" 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName} 
                                onChange={(e)=>this.setState({firstName: e.target.value})}/>
                            </Col>
                            <Col>
                                <Form.Control 
                                disabled={disabledHandler()} 
                                required 
                                autoComplete="family-name" 
                                type="text" 
                                placeholder="Last Name" 
                                value={lastName} 
                                onChange={(e)=>this.setState({lastName: e.target.value})}/>
                            </Col>                       
                        </Form.Row>
                    </Form.Group>
                    
                    
                    {classification === 'professional' && <>
                    <Form.Group controlId="formIndustry" >
                        <Form.Control 
                        disabled={disabledHandler()} 
                        onChange={(e)=>this.setState({industry: e.target.value})} 
                        as="select" 
                        value={industry} 
                        className="text-muted">
                            <option disabled selected hidden value="">Industry</option>
                            {industryArray.map(industry=>{
                                return <option>{industry}</option>
                            })}
                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId="formCompanyName" >
                        <Form.Control 
                        disabled={disabledHandler()} 
                        onChange={(e)=>this.setState({companyName: e.target.value})}
                        value={companyName}
                        required 
                        type="text" 
                        placeholder="Company Name" />
                    </Form.Group>
                    </>
                    }
                    <Form.Group controlId="formAddress" >
                        <Form.Control 
                        disabled={disabledHandler()} 
                        required 
                        onChange={(e)=>this.setState({street: e.target.value})} 
                        value ={street} 
                        type="text" 
                        placeholder="Street" />
                    </Form.Group>
                    
                    <Form.Row>
                        <Form.Group  as={Col} controlId="formGridCity" onChange={(e)=>this.setState({city: e.target.value})}>
                            <Form.Control 
                            disabled={disabledHandler()} 
                            required
                            onChange={(e)=>this.setState({city: e.target.value})}
                            value={city} 
                            placeholder="City" className="text-muted"/>
                        </Form.Group>

                        <Form.Group 
                        as={Col} 
                        controlId="formGridState" >
                            <Form.Control 
                            disabled={disabledHandler()} 
                            required 
                            value={state} 
                            onChange={(e)=>this.setState({state: e.target.value})}
                            as="select" 
                            className="text-muted">
                                <option disabled selected hidden value="">State...</option>
                                {stateArray.map(state => {
                                    return <option>{state}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                    

                        <Form.Group as={Col} controlId="formGridZip">
                            
                            <Form.Control 
                            disabled={disabledHandler()} 
                            required 
                            onChange={(e)=>this.setState({zip: e.target.value})}
                            value={zip}
                            placeholder="Zip" 
                            className="text-muted"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col} controlId="formGridState" >
                            <Form.Control 
                            disabled={disabledHandler()} 
                            required 
                            value={state} 
                            onChange={(e)=>this.setState({referrer: e.target.value})}
                            as="select" 
                            className="text-muted">
                                <option disabled selected hidden value="">How Did You Hear About Us?</option>
                                {referralArray.map(referrer => {
                                    return <option>{referrer}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check 
                        disabled={disabledHandler()} 
                        type="checkbox" 
                        checked 
                        label="Join the AKDO Insider Email List" 
                        onChange={(e)=>this.setState({addToEmailList: e.target.value})}
                        value={addToEmailList}/>
                    </Form.Group>
                    </>}
                    
                    {((status === 'new' || emailSubmitted === true) && loading === false)  && <Button variant="primary" size="lg" type="submit">
                        Sign In
                    </Button>}
                    <CustomerSummary 
                    modalIsOpen={modalIsOpen}
                    handleClose={closeModal}
                    handleSubmit={completeHandler}
                    {...this.state}
                />
                </Form>
                
            </Container>
        )
    }
}

export default SignInForm;