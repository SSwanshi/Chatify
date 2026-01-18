import { useEffect, useState, useContext } from 'react';
import { getUsers } from '../../../service/api';
import Conversation from './Conversation';
import { Box, styled } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';

const Component = styled(Box)`
    flex: 1; // Take up remaining space
    overflow-y: auto; // Scroll within this area
    margin-top: 10px;
    height: auto; // Remove fixed height
    
    // Custom scrollbar
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const Conversations = ({ text }) => {
    const [users, setUsers] = useState([]);
    const { account, socket, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await getUsers();
                if (response && Array.isArray(response)) {
                    const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
                    setUsers(filteredData);
                } else {
                    console.warn('getUsers returned invalid data:', response);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            }
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit('addUsers', account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        });
    }, [account, socket, setActiveUsers])

    return (
        <Component>
            {
                users.map(user => (
                    user.sub !== account.sub &&
                    <Conversation key={user.sub} user={user} />
                ))
            }
        </Component>
    )
}

export default Conversations;