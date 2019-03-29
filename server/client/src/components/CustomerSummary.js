import React from 'react';
import { Modal, Container, Row, Col, Button, Table } from 'react-bootstrap';


const CustomerSummary = (props) => {

    const { modalIsOpen, 
        handleClose,
        handleSubmit,
        status, 
        email,
        firstName,
        lastName,
        industry,
        companyName,
        street,
        city,
        state,
        zip,
        classification,
        phone
     } = props

    console.log(props)
   

    const containerStyle = {
        width: '40%',
        height: '50%',
        border: '1px solid gray',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px lightgray',
        padding: '25px'
    }
    const modalStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      }

      

    return (
        <Modal
            show={modalIsOpen}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Customer Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6><strong>Customer Name:</strong> {firstName + ' ' + lastName}</h6>
                {companyName &&<h6><strong>Company Name:</strong> {companyName}</h6>}
                <h6><strong>Address:</strong> {street + ', ' + city +', ' + state + ', ' + zip}</h6>
                <h6><strong>Phone Number:</strong> {phone}</h6>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={() => window.print()}>
              Print Info
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Finish Sign-In!
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomerSummary;