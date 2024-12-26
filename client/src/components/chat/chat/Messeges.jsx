import { Box, styled } from '@mui/material';
import Footer from './Footer';
import { useContext, useState, useEffect, useRef } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { newMessage, getMessages } from '../../../service/api';
import Message from './Message';

const Wrapper = styled(Box)`
    background-image: url('https://img.freepik.com/free-vector/gradient-dark-dynamic-lines-background_23-2148995950.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-left: 5px;
    border-radius: 5px;
    margin-top: 2px;
`;

const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 20px;
`;

const Messages = ({ person, conversation }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);
    
    const [file, setFile] = useState();
    const [image, setImage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    })

    // Fetching messages when conversation changes or new messages are received
    useEffect(() => {
        const getMessageDetails = async () => {
            try {
                if (conversation?._id) {
                    const data = await getMessages(conversation._id);
                    setMessages(data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        getMessageDetails();
    }, [person._id, conversation?._id, newMessageFlag]);

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (messages.length > 0 && scrollRef.current) {
            const timer = setTimeout(() => {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 0); // Delaying to ensure the DOM is updated
            return () => clearTimeout(timer);
        }
    }, [messages]);

    useEffect(()=> {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
        setMessages(prev => [...prev, incomingMessage])
    },[incomingMessage, conversation])

    const sendText = async (e) => {
        const code = e.keyCode || e.which;
        if (code === 13 && value.trim()) {
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                };
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image
                };
            }

            socket.current.emit('sendMessage', message);

            try {
                await newMessage(message);
                setMessages((prev) => [...prev, message]);
                setValue('');
                setFile('');
                setImage('');
                setNewMessageFlag(prev => !prev);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <Wrapper>
            <Component>
                {
                    messages && messages.map((message, index) => (
                        <Container key={index}>
                            <Message message={message} />
                        </Container>
                    ))
                }
                <div ref={scrollRef} />
            </Component>
            <Footer sendText={sendText}
                setValue={setValue} 
                value={value}
                file={file}
                setFile={setFile}
                setImage={setImage}
            /> 
        </Wrapper>
    );
};

export default Messages;
