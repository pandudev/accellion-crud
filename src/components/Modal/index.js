import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Modal as BSModal } from 'react-bootstrap'
import Form, { Input } from '../Form'

const Modal = ({ isShow, closeModal, isDelete, data, formSubmit, deleteData }) => {

    const title = isDelete ? 'Confirm Delete' : 'User Form';
    const [disabled, setDisabled] = useState(!isDelete);

    const handleSubmit = () => {
        isDelete ? deleteData(data) :
            document.querySelector('#formButton').click();
    }

    const onSubmit = (data) => {
        formSubmit(data);
    }

    const handleDisable = (val) => {
        setDisabled(val);
    }

    useEffect(() => {
        setDisabled(!isDelete);

    }, [data])


    return (
        <BSModal id="userModal" show={isShow} onHide={closeModal} >
            <BSModal.Header closeButton>
                <BSModal.Title>{title}</BSModal.Title>
            </BSModal.Header>
            <BSModal.Body>
                {
                    isDelete ? (
                        <p>Are you sure to delete <strong>{data.username}</strong> data?</p>
                    ) : (
                        <Form onSubmit={onSubmit} defaultValues={data} setDisable={handleDisable}>
                            <Input required type="text" placeholder="User Name" name="username" feedback={"Please provide a valid username"} />
                            <Input required type="email" placeholder="User Email" name="email" feedback={"Please provide a valid email"} />
                            <Input required type="number" min={0} max={100} placeholder="User Score" name="score" feedback={"Score must between 0 to 100"} />
                            <Button hidden id="formButton" type="submit">Submit</Button>
                        </Form>
                    )
                }
            </BSModal.Body>
            <BSModal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                <Button variant="primary" disabled={disabled} onClick={handleSubmit}>{isDelete ? 'Delete' : 'Save Changes'}</Button>
            </BSModal.Footer>
        </BSModal>
    )
}

export default Modal
