import firebase from './../../config/firebase';
import { NotificationManager } from 'react-notifications';

export const getUsers = () => {
    const usersRef = firebase.firestore().collection('users');
    return usersRef;
}

export const addUser = (user) => {
    const { email, username, score } = user;
    const usersRef = firebase.firestore().collection('users');

    const transformUser = {
        email,
        username,
        score,
        registered: new Date()
    }

    usersRef.add(transformUser).then(res => {
        NotificationManager.success('User has beed added.', 'Success');
    }, (err) => {
        var errorCode = err.code;
        var errorMessage = err.message;

        NotificationManager.error(errorMessage, errorCode);
    });
}

export const updateUser = (user) => {
    const { id, email, username, score } = user;
    const usersRef = firebase.firestore().doc(`users/${id}`);

    usersRef.get().then(doc => {
        if (doc.exists) {
            usersRef.update({
                email,
                username,
                score,
            }).then(res => {
                NotificationManager.success('User has beed updated.', 'Success');
            }, (err) => {
                var errorCode = err.code;
                var errorMessage = err.message;

                NotificationManager.error(errorMessage, errorCode);
            });
        }
    })

}

export const deleteUser = (id) => {
    const usersRef = firebase.firestore().doc(`users/${id}`);
    usersRef.get().then(doc => {
        if (doc.exists) {
            usersRef.delete().then(res => {
                NotificationManager.success('User has beed deleted.', 'Success');
            }, (err) => {
                var errorCode = err.code;
                var errorMessage = err.message;

                NotificationManager.error(errorMessage, errorCode);
            });
        }
    })
}