import { Box, Typography, styled } from '@mui/material'
import { formatDate, downloadMedia } from '../../../utils/common-utils'
import { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import { GetApp, Description } from '@mui/icons-material';
import { url } from '../../../service/api';

const Own = styled(Box)(({ theme }) => ({
    background: '#6366f1',
    color: '#ffffff',
    padding: '10px 14px',
    maxWidth: '65%',
    width: 'fit-content',
    marginLeft: 'auto',
    borderRadius: '18px 18px 4px 18px',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
    marginBottom: '4px',
    position: 'relative',
    wordBreak: 'break-word',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '85%',
        padding: '8px 12px'
    }
}));

const Wrapper = styled(Box)(({ theme }) => ({
    background: '#1e293b',
    color: '#f8fafc',
    padding: '10px 14px',
    maxWidth: '65%',
    width: 'fit-content',
    borderRadius: '18px 18px 18px 4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '4px',
    position: 'relative',
    wordBreak: 'break-word',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '85%',
        padding: '8px 12px'
    }
}));


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
    const text = message?.text || '';
    const isPdf = text.includes('.pdf');
    const isVideo = text.match(/\.(mp4|webm|ogg|mov)$/i);
    const fileSource = text.startsWith('http') ? text : `${url}/file/${text}`;

    return (
        <FileContainer>
            {isPdf ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, background: 'rgba(0,0,0,0.1)', p: 1.5, borderRadius: '12px' }}>
                    <Description sx={{ fontSize: 32, color: '#f8fafc' }} />
                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {text.split("/").pop()}
                    </Typography>
                </Box>
            ) : isVideo ? (
                <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', minWidth: '250px' }}>
                    <video
                        src={fileSource}
                        style={{ width: '100%', maxHeight: 400, display: 'block' }}
                        controls
                    />
                    <Box
                        onClick={(e) => downloadMedia(e, fileSource)}
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
                            zIndex: 1,
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
                        }}
                    >
                        <GetApp fontSize="small" />
                    </Box>
                </Box>
            ) : (
                <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                    <img
                        style={{ width: '100%', maxHeight: 400, objectFit: 'cover', display: 'block' }}
                        src={fileSource}
                        alt="media"
                    />
                    <Box
                        onClick={(e) => downloadMedia(e, fileSource)}
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
                    position: (isPdf || isVideo) ? 'static' : 'absolute',
                    bottom: (isPdf || isVideo) ? 0 : 8,
                    right: (isPdf || isVideo) ? 0 : 12,
                    textShadow: (isPdf || isVideo) ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
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
