import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Modal as BSModal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import Form, { Input } from '../Form'

const Modal = ({ isShow, closeModal, isDelete, data, formSubmit, deleteData }) => {


    const title = isDelete ? 'Confirm Delete' : 'User Form';
    const [disabled, setDisabled] = useState(isDelete ? true : false);

    const handleSubmit = () => {
        isDelete ? deleteData(data) : 
            document.querySelector('#formButton').click();
    }

    const onSubmit = (data) => {
        formSubmit(data);
    }


    return (
        <BSModal show={isShow} onHide={closeModal} >
            <ModalHeader closeButton>
                <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {
                    isDelete ? `Are you sure to delete ${data.username} data?` : (
                        <Form onSubmit={onSubmit} defaultValues={data} setDisable={setDisabled}>
                            <Input required type="text" placeholder="User Name" name="username" />
                            <Input required type="email" placeholder="User Email" name="email" />
                            <Input required type="number" min={0} placeholder="User Score" name="score" />
                            <Button hidden id="formButton" type="submit">Submit</Button>
                        </Form>
                    )
                }
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                <Button variant="primary" disabled={disabled} onClick={handleSubmit}>{isDelete ? 'Delete' : 'Save Changes'}</Button>
            </ModalFooter>
        </BSModal>
    )
}

export default Modal
