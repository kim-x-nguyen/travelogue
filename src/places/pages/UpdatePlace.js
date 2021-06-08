import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import './PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Airplane Boneyard',
        description: 'Old Airplanes grave yard.',
        imageUrl: 'https://twistedsifter.com/wp-content/uploads/2014/02/airplane-boneyard-tucson-arizona-google-earth.jpg',
        address: 'Tucson, Arizona',
        location: {
            lat: 32.1700392,
            lng: -110.8601235
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Mysterious Desert Pattern',
        description: 'Gigantic unknown pattern on dessert.',
        imageUrl: 'https://twistedsifter.com/wp-content/uploads/2014/02/crop-circle-egypt-google-earth-strange.jpg',
        address: 'Red Sea Governorate, Egypt',
        location: {
            lat: 27.3804303,
            lng: 33.6299342
        },
        creator: 'u2'
    },
    {
        id: 'p4',
        title: 'Star Fort',
        description: 'Its original purpose was to control the only road between Germany and the city of Groningen, which was controlled by the Spaniards during the time of the Eighty Years\' War.',
        imageUrl: 'https://twistedsifter.com/wp-content/uploads/2014/02/star-fort-google-earth.jpg',
        address: 'Schansdijk 5, 4655 De Heen, The Netherlands',
        location: {
            lat: 53.0067437,
            lng: 7.1898471
        },
        creator: 'u3'
    },
];

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
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

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);


    useEffect(() => {
        if (identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace])

    // const userId = identifiedPlace.creator;

    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedPlace) {
        return <div className="center">
            <Card>
                <h2>Could not find place!</h2>
            </Card>
        </div>
    }

    if (isLoading) {
        return <div className="centered">
            <h2>Loading...</h2>
        </div>
    }

    return (<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
            id="title"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
        />
        <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)"
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
        />
        <div className="place-form__actions">
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
            {/* <Button to={`/${userId}/places`}>Cancel</Button> */}
        </div>
    </form>)
};

export default UpdatePlace;