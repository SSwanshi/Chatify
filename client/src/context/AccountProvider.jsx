import { createContext, useState, useRef, useEffect } from 'react';
import {io} from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({children}) => {

    const [account, setAccount] = useState();
    const [person, setPerson] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);

    const socket = useRef();

    useEffect(()=>{
        socket.current = io('https://chatify-t71m.onrender.com'); //socket.current = io('https://chatify-gqit.onrender.com'); // jab deploy hoga tab
    }, [])


    return (
        <AccountContext.Provider value ={{
            account,
            setAccount,
            person,
            setPerson,
            socket,
            activeUsers,
            setActiveUsers,
            newMessageFlag,
            setNewMessageFlag
        }}>
            {children}
            

        </AccountContext.Provider>
    )
}

export default AccountProvider;