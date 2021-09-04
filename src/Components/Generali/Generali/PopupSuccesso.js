import {Modal,Button} from 'react-bootstrap';
import {React} from 'react';

function PopupSuccesso(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            
          </Modal.Title>
          <Button className="btn-close" onClick={props.onHide}></Button>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.titolo}</h4>
          <p>
            {props.stringAttenzione} 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onConfirm}>Continua</Button>
        </Modal.Footer>
      </Modal>
    );
  }
 export default PopupSuccesso