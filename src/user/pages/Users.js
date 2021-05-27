import React from 'react';

import UserList from '../components/UserList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Kim Nguyen',
            image: 'https://i.pinimg.com/originals/2c/5a/57/2c5a57f4562aff17b9c2142b4b1453e1.gif',
            places: 3
        },
        {
            id: 'u2',
            name: 'Vu Nguyen',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa9hmjQbwTeGgtB_smMXHbZPvaIwRx10YxmzKmgpIBRHL5j0ZiTeNk7BDgJD2yHBqxotY&usqp=CAU',
            places: 2
        },
        {
            id: 'u3',
            name: 'Duc Nguyen',
            image: 'https://img.freepik.com/free-vector/pixel-art-cartoon-boy-character-wearing-mask-brown-scarf_41992-1279.jpg?size=338&ext=jpg',
            places: 1
        }
    ];

    return <UserList items={USERS} />
};

export default Users;