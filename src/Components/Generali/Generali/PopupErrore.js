import {Modal,Button} from 'react-bootstrap';
import {React} from 'react';

function PopupErrore(props){
    
    return(
        <Modal {...props} >
            <Modal.Header>
            <Modal.Title>Errore!</Modal.Title>
            <Button className="btn-close" onClick={props.onHide}></Button>
            </Modal.Header>
            <Modal.Body>{props.errore}</Modal.Body>        
        </Modal>
    )
}

export default PopupErrore