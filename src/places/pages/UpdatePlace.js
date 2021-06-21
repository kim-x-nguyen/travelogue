import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';



const UpdatePlace = () => {
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const auth = useContext(AuthContext);

    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlace(responseData.place);
                console.log(responseData);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);


    // const userId = identifiedPlace.creator;

    const placeUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`, 'PATCH',
                {
                    "Content-Type": "application/json"
                },
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }));
            console.log(responseData.message);
            history.push(`/${auth.userId}/places`);
        } catch (err) {
            console.log(err);
        }

    }

    if (isLoading) {
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }

    if (!loadedPlace && !error) {
        return <div className="center">
            <Card>
                <h2>Could not find place!</h2>
            </Card>
        </div>
    }



    return (<Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={loadedPlace.title}
                initialValid={true}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid description (min. 6 characters)"
                onInput={inputHandler}
                initialValue={loadedPlace.description}
                initialValid={true}
            />
            <div className="place-form__actions">
                <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
                {/* <Button to={`/${userId}/places`}>Cancel</Button> */}
            </div>
        </form>}
    </Fragment>)
};

export default UpdatePlace;