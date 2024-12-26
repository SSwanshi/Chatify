import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AccountContext } from '../../../context/AccountProvider';
import { useContext, useEffect, useState } from 'react';
import { setConversation, getConversation } from '../../../service/api';
import { formatDate } from '../../../utils/common-utils';


const ConversationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '18px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#384B70',
    '&:hover': {
        backgroundColor: '#507687',
    },
}));

const ImageContainer = styled(Box)({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '15px',
});

const NameText = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#FCFAEE',
    display: 'flex'
}));

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color:rgba(207, 196, 196, 0.6);
    margin-right: 20px;
`;

const Text = styled(Typography)`
    display: block;
    color: rgba(216, 210, 210, 0.83);
    font-size: 14px;
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
    }, [newMessageFlag]);

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
