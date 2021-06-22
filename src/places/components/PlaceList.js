import React, {useContext} from 'react';
import { useHistory } from 'react-router';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

import { AuthContext } from '../../shared/context/auth-context';

const PlaceList = props => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const clickHandler = () => {
        if(auth.isLoggedIn){
            history.push('/places/new');
        } else {
            history.push('/auth');
        }
    }


    if (props.items.length === 0) {
        return <div className="place-list center">
            <Card>
                <h2>No places found. Maybe create one?</h2>
                <Button type="button" onClick={clickHandler}>Share Place</Button>
            </Card>
        </div>
    }

    return <ul className='place-list'>
        {props.items.map(item =>
            <PlaceItem
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                address={item.address}
                creatorId={item.creator}
                coordinates={item.location}
                onDelete={props.onDeletePlace}
            />)}
    </ul>
};

export default PlaceList;