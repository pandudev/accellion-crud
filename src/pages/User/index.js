
import React, { Fragment, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import './User.scss'
import Table from './../../components/Table'
import Modal from '../../components/Modal'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { addUser, deleteUser, getUsers, updateUser } from '../../services/User'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Spinner from './../../components/Spinner';

const User = () => {

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = getUsers().onSnapshot(snap => {
            dataMapping(snap);

            setIsLoading(false);
        }, (err) => {
            var errorCode = err.code;
            var errorMessage = err.message;

            NotificationManager.error(errorMessage, errorCode);
        });

        return () => unsubscribe()

    }, [])

    const dataMapping = (snap) => {
        const userList = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            registered: new Date(doc.data().registered.seconds * 1000).toISOString()
        }));

        setUsers(userList);
    }

    const handleFormSubmit = (data) => {
        if (data.id) {
            updateUser(data);
        } else {
            addUser(data);
        }

        handleCloseModal();
    }

    const handleDeleteData = (data) => {
        deleteUser(data.id);
        handleCloseModal();
    }

    const handleDelete = (data) => {
        setIsDelete(true);
        setSelectedData(data);
        setShowModal(true);
    }

    const handleEdit = (data) => {
        setIsDelete(false);
        setSelectedData(data);
        setShowModal(true);
    }

    const handleAdd = () => {
        const newUser = {
            id: null,
            username: '',
            email: '',
            score: null
        };

        setIsDelete(false);
        setSelectedData(newUser);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setIsDelete(null);
        setSelectedData(null);
    }

    return (
        <Fragment>
            <NotificationContainer />
            {isLoading ? (<Spinner />) : null}
            <Container className="py-3">
                <div className="d-flex mb-3 justify-content-between align-items-center">
                    <h1 className='h2'><span className='bg-primary text-light px-2'> Accellion</span> Frontend Developer Test</h1>
                    <Button variant="primary" id="addButton" onClick={handleAdd}><FontAwesomeIcon className="mr-1" icon={faUserPlus} /> <span>Add User</span></Button>
                </div>
                <Table data={users} deleteAction={handleDelete} editAction={handleEdit}/>
            </Container>


            <Modal isShow={showModal} closeModal={handleCloseModal} isDelete={isDelete} data={selectedData} formSubmit={handleFormSubmit} deleteData={handleDeleteData} />
        </Fragment>
    )
}

export default User