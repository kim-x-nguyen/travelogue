import React, { useState, useContext, Fragment } from 'react';

import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';


const Auth = props => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLonginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();



    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLonginMode(prev => !prev);
    };

    const authSubmitHandler = async event => {
        event.preventDefault();
       
        if (isLoginMode) {
            try {

                const responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST',
                    {
                        'Content-Type': 'application/json'
                    },
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                );
                console.log(responseData.user.id);
                auth.login(responseData.user.id);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/signup',
                    'POST',
                    {
                        'Content-Type': 'application/json'
                    },
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                );
                console.log(responseData.user.id);
                auth.login(responseData.user.id);
            } catch (err) {
                console.log(err);
            }
        }
    }


    return (<Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>Login Required</h2>
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Your Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid name."
                    onInput={inputHandler}
                />}
                <Input
                    id="email"
                    element="input"
                    type="input"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid password."
                    onInput={inputHandler}

                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password (at least 6 characters)."
                    onInput={inputHandler}

                />
                <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
        </Card>
    </Fragment>
    );
}

export default Auth;