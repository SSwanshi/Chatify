import { Box, Typography, styled } from '@mui/material'
import { formatDate, downloadMedia } from '../../../utils/common-utils'
import { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import { GetApp, Description } from '@mui/icons-material';

const Own = styled(Box)`
    background: #6366f1;
    color: #ffffff;
    padding: 10px 14px;
    max-width: 65%;
    width: fit-content;
    margin-left: auto;
    border-radius: 18px 18px 4px 18px;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    margin-bottom: 4px;
    position: relative;
    word-break: break-word;
`;

const Wrapper = styled(Box)`
    background: #1e293b;
    color: #f8fafc;
    padding: 10px 14px;
    max-width: 65%;
    width: fit-content;
    border-radius: 18px 18px 18px 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 4px;
    position: relative;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 15px;
    line-height: 1.5;
    font-family: 'Inter', sans-serif;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 4px;
    text-align: right;
    display: block;
`;

const IncomingTime = styled(Time)`
    color: #64748b;
`;

const FileContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ImageMessage = ({ message }) => {
    const isPdf = message?.text?.includes('.pdf');

    return (
        <FileContainer>
            {isPdf ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, background: 'rgba(0,0,0,0.1)', p: 1.5, borderRadius: '12px' }}>
                    <Description sx={{ fontSize: 32, color: '#f8fafc' }} />
                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {message.text.split("/").pop()}
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                    <img
                        style={{ width: '100%', maxHeight: 400, objectFit: 'cover', display: 'block' }}
                        src={message.text}
                        alt="media"
                    />
                    <Box
                        onClick={(e) => downloadMedia(e, message.text)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(0,0,0,0.4)',
                            color: 'white',
                            p: 0.5,
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
                        }}
                    >
                        <GetApp fontSize="small" />
                    </Box>
                </Box>
            )}
            <Time
                sx={{
                    position: isPdf ? 'static' : 'absolute',
                    bottom: isPdf ? 0 : 8,
                    right: isPdf ? 0 : 12,
                    textShadow: isPdf ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
                }}
            >
                {formatDate(message.createdAt)}
            </Time>
        </FileContainer>
    );
}

const TextMessage = ({ message, isOwn }) => {
    return (
        <>
            <Text>{message.text}</Text>
            {isOwn ? (
                <Time>{formatDate(message.createdAt)}</Time>
            ) : (
                <IncomingTime>{formatDate(message.createdAt)}</IncomingTime>
            )}
        </>
    )
}

export const Message = ({ message }) => {
    const { account } = useContext(AccountContext);
    const isOwn = account.sub === message.senderId;

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {isOwn ? (
                <Own>
                    {message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} isOwn={true} />}
                </Own>
            ) : (
                <Wrapper>
                    {message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} isOwn={false} />}
                </Wrapper>
            )}
        </Box>
    )
}

export default Message;
