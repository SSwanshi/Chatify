import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AccountContext } from '../../../context/AccountProvider';
import { useContext, useEffect, useState } from 'react';
import { setConversation, getConversation } from '../../../service/api';
import { formatDate } from '../../../utils/common-utils';


const ConversationContainer = styled(Box)`
    display: flex;
    align-items: center;
    padding: 12px 15px;
    margin: 5px 10px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.05);
    }
`;

const ImageContainer = styled(Box)`
    width: 45px;
    height: 45px;
    borderRadius: 50%;
    margin-right: 15px;
    position: relative;
    
    & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const NameText = styled(Typography)`
    font-size: 1rem;
    font-weight: 500;
    color: #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
`;

const Timestamp = styled(Typography)`
    font-size: 0.75rem;
    color: #94a3b8;
`;

const Text = styled(Typography)`
    display: block;
    color: #64748b;
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Conversation = ({ user }) => {
    const { setPerson, account, newMessageFlag } = useContext(AccountContext);

    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
            setMessage({ text: data?.message, timestamp: data?.updatedAt });
        }
        getConversationDetails();
    }, [newMessageFlag, account.sub, user.sub]);

    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account.sub, receiverId: user.sub });
    };

    const fileText = message?.text && (
        message.text.includes('.pdf') ? 'PDF File' :
            message.text.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i) ? 'Image' : null
    );

    return (
        <ConversationContainer onClick={() => getUser()}>
            <ImageContainer>
                <img
                    src={user.picture}
                    alt="dp"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </ImageContainer>

            <Box style={{ width: '100%' }}>
                <NameText>
                    {user.name}
                    {message?.text && <Timestamp> {formatDate(message?.timestamp)} </Timestamp>}
                </NameText>
                <Text>{fileText || message.text}</Text>
            </Box>
        </ConversationContainer>
    );
};

export default Conversation;
