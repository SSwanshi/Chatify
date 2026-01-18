import { Box, styled } from '@mui/material';
import Footer from './Footer';
import { useContext, useState, useEffect, useRef } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { newMessage, getMessages } from '../../../service/api';
import Message from './Message';

const Wrapper = styled(Box)`
    background: transparent;
    display: flex;
    flex-direction: column;
    flex: 1; // Take remaining space
    overflow: hidden; // Prevent double scrollbars
`;

const Component = styled(Box)`
    flex: 1;
    overflow-y: auto;
    padding-top: 20px;
    
    // Custom scrollbar
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
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
    }, [socket])

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

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            incomingMessage.senderId !== account.sub && // Prevent processing own messages from socket
            setMessages(prev => [...prev, incomingMessage])
    }, [incomingMessage, conversation, account.sub])

    const sendText = async (e) => {
        const code = e.keyCode || e.which;
        if (code === 13 && (value.trim() || file)) {
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value,
                    createdAt: Date.now() // Add timestamp for immediate display
                };
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image,
                    createdAt: Date.now()
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
                image={image}
            />
        </Wrapper>
    );
};

export default Messages;
