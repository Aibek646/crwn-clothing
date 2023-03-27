import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firesbase.utils";

import "./sign-in-form.styles.scss";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch } from "react-redux";
import {
    googleSignInStart,
    emailSignInStart
} from "../../store/user/user.action";

const defaultFormFields = {
    email: "",
    password: ""
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error);
            }
            // if (error.code === "auth/wrong-password") {
            //     alert("incorrect password for email");
            // } else if (auth / user - not - found) console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <h1>Sign in with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={handleChange}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                        buttonType="google"
                        type="submit"
                    >
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
