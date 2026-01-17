import { Box, Typography, styled } from '@mui/material'
import { formatDate, downloadMedia } from '../../../utils/common-utils'
import { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import GetAppIcon from '@mui/icons-material/GetApp';
import { iconPDF } from '../../../constants/data';


const Own = styled(Box)`
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #fff;
    max-width: 60%;
    margin-left: auto;
    padding: 10px 15px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 16px 16px 0 16px;
    word-break: break-word;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled(Box)`
    background: rgba(51, 65, 85, 0.8); // Dark slate
    color: #f1f5f9;
    max-width: 60%;
    padding: 10px 15px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 16px 16px 16px 0;
    word-break: break-word;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Text = styled(Typography)`
    font-size: 15px;
    margin-bottom: 4px;
    line-height: 1.5;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6); // Consistent light opacity for both
    margin-top: auto;
    align-self: flex-end;
    font-weight: 500;
`;

export const Message = ({ message }) => {

    const { account } = useContext(AccountContext)
    return (
        <>
            {
                account.sub === message.senderId ?
                    <Own>{
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }

                    </Own>
                    :
                    <Wrapper>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }
                    </Wrapper>
            }
        </>

    )
}

const ImageMessage = ({ message }) => {
    const isVideo = (url) => {
        return url?.match(/\.(mp4|webm|mov|avi|mkv)$/i);
    };

    return (
        <Box style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={iconPDF} alt="pdf-icon" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                    </div>
                    : isVideo(message.text) ?
                        <video
                            controls
                            style={{
                                width: '100%',
                                maxWidth: '300px',
                                height: 'auto',
                                borderRadius: '10px'
                            }}
                        >
                            <source src={message.text} />
                            Your browser does not support the video tag.
                        </video>
                        :
                        <img
                            style={{
                                width: '100%',
                                maxWidth: '300px',
                                height: 'auto',
                                objectFit: 'contain',
                                borderRadius: '10px'
                            }}
                            src={message.text}
                            alt={message.text}
                        />
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon
                    onClick={(e) => downloadMedia(e, message.text)}
                    fontSize='small'
                    style={{ marginRight: 10, border: '1px solid rgba(255,255,255,0.5)', borderRadius: '50%', cursor: 'pointer' }}
                />
                {formatDate(message.createdAt)}
            </Time>
        </Box>
    )
}

const TextMessage = ({ message }) => {
    return (
        <>
            <Text> {message.text}</Text>
            <Time> {formatDate(message.createdAt)}</Time>
        </>
    )
}

export default Message;