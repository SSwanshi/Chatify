import { Box, styled } from '@mui/material';
import Footer from './Footer';
import { useContext, useState, useEffect, useRef } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { newMessage, getMessages } from '../../../service/api';
import Message from './Message';

const Wrapper = styled(Box)`
    background-color: #0f172a;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
`;


const Component = styled(Box)`
    flex: 1;
    overflow-y: auto;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const Messages = ({ person, conversation }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

    const [file, setFile] = useState(null);
    const [image, setImage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        const handleMessage = data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        };

        const currentSocket = socket.current;
        if (currentSocket) {
            currentSocket.on('getMessage', handleMessage);
        }

        return () => {
            if (currentSocket) {
                currentSocket.off('getMessage', handleMessage);
            }
        };
    }, [socket]);

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
    }, [conversation?._id, newMessageFlag]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (incomingMessage && conversation?.members?.includes(incomingMessage.senderId)) {
            setMessages(prev => [...prev, incomingMessage]);
        }
    }, [incomingMessage, conversation]);

    const sendText = async (e, uploadedFileText) => {
        const code = e.keyCode || e.which;
        if (code === 13 && (value.trim() || uploadedFileText || file)) {
            let message = {};
            const textToSend = uploadedFileText || image || value;

            if (!file && !uploadedFileText) {
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
                    text: textToSend
                };
            }

            if (socket.current) {
                socket.current.emit('sendMessage', message);
            }

            try {
                await newMessage(message);
                setMessages((prev) => [...prev, message]);
                setValue('');
                setFile(null);
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
                        <Box key={index}>
                            <Message message={message} />
                        </Box>
                    ))
                }
                <div ref={scrollRef} />
            </Component>
            <Footer
                sendText={sendText}
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

