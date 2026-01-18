import { Box, Typography, styled } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';
import { useContext, useEffect, useState } from 'react';
import { setConversation, getConversation } from '../../../service/api';
import { formatDate } from '../../../utils/common-utils';

const ConversationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    margin: '4px 8px',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.05)',
    },
    '&.selected': {
        background: 'rgba(99, 102, 241, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
    }
}));

const Image = styled('img')({
    width: 48,
    height: 48,
    objectFit: 'cover',
    borderRadius: '12px',
    marginRight: '16px',
});

const Content = styled(Box)`
    flex: 1;
    overflow: hidden;
`;

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
`;

const Name = styled(Typography)`
    font-size: 15px;
    font-weight: 600;
    color: #f8fafc;
    font-family: 'Inter', sans-serif;
`;

const Time = styled(Typography)`
    font-size: 12px;
    color: #64748b;
    font-family: 'Inter', sans-serif;
`;

const LastMessage = styled(Typography)`
    font-size: 13px;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Inter', sans-serif;
`;

const Conversation = ({ user }) => {
    const { setPerson, account, newMessageFlag, person } = useContext(AccountContext);
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

    const isSelected = person.sub === user.sub;

    const getDisplayMessage = () => {
        if (!message?.text) return '';
        if (message.text.includes('.pdf')) return 'Shared a PDF';
        if (message.text.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i)) return 'Shared an image';
        return message.text;
    };

    return (
        <ConversationContainer
            onClick={() => getUser()}
            className={isSelected ? 'selected' : ''}
        >
            <Image src={user.picture} alt="avatar" />
            <Content>
                <Header>
                    <Name>{user.name}</Name>
                    {message?.timestamp && (
                        <Time>{formatDate(message.timestamp)}</Time>
                    )}
                </Header>
                <LastMessage>
                    {getDisplayMessage()}
                </LastMessage>
            </Content>
        </ConversationContainer>
    );
};

export default Conversation;

