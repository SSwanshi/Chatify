import { Box, Typography, styled } from '@mui/material'
import { formatDate, downloadMedia } from '../../../utils/common-utils'
import { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import GetAppIcon from '@mui/icons-material/GetApp';
import {iconPDF} from '../../../constants/data';


const Own = styled(Box)`
    background: #D9EAFD;
    max-width: 60%;
    margin-left: auto;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`

const Wrapper = styled(Box)`
    background:#1E3E62;
    max-width: 60%;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
    color: #ededed;
`
const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color:rgb(113, 111, 111);
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
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

    return (
        <div style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <div style={{ display: 'flex' }}>
                        <img src={iconPDF} alt="pdf-icon" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                    </div>
                : 
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon 
                    onClick={(e) => downloadMedia(e, message.text)} 
                    fontSize='small' 
                    style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }} 
                />
                {formatDate(message.createdAt)}
            </Time>
        </div>
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