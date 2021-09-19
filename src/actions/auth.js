import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );
        
        const auth = getAuth();
        signInWithEmailAndPassword( auth, email, password )
        .then( ({ user }) => {
            dispatch( login( user.uid, user.displayName ) )
            
                dispatch( finishLoading() );
            })
            .catch( e => {
                const errorCode = e.code;
                var errorMess = 'El usuario no existe.';
                // console.log('errorCode', errorCode);
                if (errorCode === 'auth/wrong-password') {
                    errorMess = 'Password equivocado.';
                } 
                dispatch( finishLoading() );

                Swal.fire('Error', errorMess, 'error');
            });
            
    }
}


export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {

        const auth = getAuth();
        createUserWithEmailAndPassword( auth, email, password )
            .then( async({ user }) => {

                await updateProfile( user, { displayName: name });
                dispatch(
                    login( user.uid, user.displayName )
                )

            })
            .catch( e => {
                // console.log(e.code);
                var errorMess = 'Se produjo un error, inténtalo más tarde.';

                const errorCode = e.code;
                if (errorCode === 'auth/email-already-in-use') {
                    errorMess = 'Ese correo ya esta registrado.';
                }
                // console.log(e.message);
                Swal.fire('Error', errorMess, 'error');
            });
    }
}


export const startGoogleLogin = () => {
    return ( dispatch ) => {

        const auth = getAuth();
        signInWithPopup( auth, googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    },
});


export const startLogout = () => {
    return async ( dispatch ) => {
        
        const auth = getAuth();
        await signOut(auth);

        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})