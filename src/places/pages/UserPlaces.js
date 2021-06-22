import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState([])
    const { isLoading, sendRequest} = useHttpClient();
    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeteleHandler = (deteledPlaceId) => {
        setLoadedPlaces(prev => prev.filter(place => place.id !== deteledPlaceId));
    }

    return <Fragment>
        
        {isLoading && <div className='center'>
            <LoadingSpinner />
        </div>}
        {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeteleHandler} />}
    </Fragment>

};

export default UserPlaces;