import React from 'react'
// import Button from 'react-bootstrap/button'
// import Modal from 'react-bootstrap/modal'

class ModalComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAccept = this.handleAccept.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }
    handleAccept() {
        this.props.acceptCallback();
    }

    render() {
        return (''
            // <>
            //     <Button variant={this.props.type} onClick={this.handleShow}>
            //         {this.props.buttonMessage}
            //     </Button>

            //     <Modal show={this.state.show} onHide={this.handleClose}>
            //         <Modal.Header closeButton>
            //             <Modal.Title>{this.props.header}</Modal.Title>
            //         </Modal.Header>
            //         <Modal.Body>{this.props.message}</Modal.Body>
            //         <Modal.Footer>
            //             <Button variant="secondary" onClick={this.handleClose}>
            //                 Close
            //             </Button>
            //             <Button variant="primary" onClick={this.handleAccept}>
            //                 Accept
            //             </Button>
            //         </Modal.Footer>
            //     </Modal>
            // </>
        );
    }
}

export default ModalComponent