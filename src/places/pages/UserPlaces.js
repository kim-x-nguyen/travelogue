import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

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

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return <PlaceList items={loadedPlaces} />
};

export default UserPlaces;