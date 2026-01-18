import { Box, InputBase, styled } from '@mui/material';
import { AttachFile, EmojiEmotionsOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import { UploadFile } from '../../../service/api';


const Container = styled(Box)`
    height: 50px;
    background: #070F2B;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 0 6px;
        color: #ededed;
        margin-bottom: 15px;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #ededed;
    width: calc(94% - 65px); //yha se hum input field ka right se length manage kr skte hai
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 17px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;


const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                let response = await UploadFile(data);
                setImage(response.data);
            }
        }
        getImage();
    }, [file, setImage])

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setValue(e.target.files[0].name);
    }

    return (
        <Container>
            <EmojiEmotionsOutlined />
            <label htmlFor="fileInput">
                <AttachFile />
            </label>

            <input type='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={(e) => onFileChange(e)}
            />
            <Search>
                <InputField
                    placeholder="Type a message..."
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => sendText(e)}
                    value={value}
                />

            </Search>
        </Container>
    );
};

export default Footer;
