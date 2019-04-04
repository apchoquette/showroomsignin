import React from 'react';
import { Modal, Button} from 'react-bootstrap';


const CustomerSummary = (props) => {

    const { modalIsOpen,   
        handleClose,
        handleSubmit,
        firstName,
        lastName,
        companyName,
        street,
        city,
        state,
        zip,
        phone,
        email
     } = props
     
    return (
        <Modal
            show={modalIsOpen}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Verify Customer Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6><strong>Customer Name:</strong> {firstName + ' ' + lastName}</h6>
                {companyName &&<h6><strong>Company Name:</strong> {companyName}</h6>}
                <h6><strong>Address:</strong> {street + ', ' + city +', ' + state + ', ' + zip}</h6>
                <h6><strong>Phone Number:</strong> {phone}</h6>
                <h6><strong>Email:</strong> {email}</h6>

                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Finish Sign-In!
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomerSummary;