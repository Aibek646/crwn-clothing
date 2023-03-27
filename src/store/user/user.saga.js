import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
    createUserDocumentFromAuth,
    getCurrentUser,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword
} from "../../utils/firebase/firesbase.utils";
import { signInFailed, signInSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInwithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUpwithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
    } catch (error) {}
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInwithEmail);
}

export function* onEmailSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, signUpwithEmail);
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ]);
}
