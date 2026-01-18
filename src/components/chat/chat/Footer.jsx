import { Box, InputBase, styled, IconButton, Typography } from '@mui/material';
import { AttachFile, EmojiEmotionsOutlined, Close, Send } from '@mui/icons-material';
import { useEffect, useState, useRef, useCallback } from 'react';
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
    background-color: #374151;
    width: calc(94% - 65px);
    position: relative;
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 17px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
    color: #F4F6FF;
    &::placeholder {
        color: #9CA3AF;
    }
`;

const MediaPreview = styled(Box)`
    position: absolute;
    top: -120px;
    left: 0;
    right: 0;
    background: #1F2937;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 1px solid #374151;
    z-index: 1000;
`;

const PreviewImage = styled('img')`
    max-width: 200px;
    max-height: 100px;
    border-radius: 8px;
    object-fit: cover;
`;

const PreviewControls = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
`;

const FileName = styled(Typography)`
    font-size: 12px;
    color: #CBD5E1;
    flex: 1;
    margin-right: 8px;
`;


const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const fileInputRef = useRef(null);

    const uploadFile = useCallback(async () => {
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            let response = await UploadFile(data);
            setImage(response.data);
            // Reset states after upload
            setFile(null);
            setValue('');
        }
    }, [file, setImage, setFile, setValue]);

    const handleCancelMedia = useCallback(() => {
        setShowPreview(false);
        setPreviewUrl('');
        setFile(null);
        setValue('');
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [setFile, setValue]);

    const handleSendMedia = useCallback(async () => {
        // First upload the file
        await uploadFile();
        // Then send the message by simulating Enter key press
        const mockEvent = {
            keyCode: 13,
            which: 13,
            preventDefault: () => {},
            stopPropagation: () => {}
        };
        sendText(mockEvent);
        setShowPreview(false);
        setPreviewUrl('');
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [uploadFile, sendText]);

    useEffect(() => {
        const handleKeyDown = async (e) => {
            if (showPreview) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    await handleSendMedia();
                } else if (e.key === 'Escape') {
                    handleCancelMedia();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [showPreview, handleSendMedia, handleCancelMedia]);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setValue(selectedFile.name);
            setShowPreview(true);

            // Create preview URL for images
            if (selectedFile.type.startsWith('image/')) {
                const url = URL.createObjectURL(selectedFile);
                setPreviewUrl(url);
            } else {
                setPreviewUrl('');
            }
        }
    }

    return (
        <Container>
            <EmojiEmotionsOutlined />
            <label htmlFor="fileInput">
                <AttachFile />
            </label>

            <input type='file'
                ref={fileInputRef}
                id='fileInput'
                style={{ display: 'none' }}
                onChange={(e) => onFileChange(e)}
            />
            <Search>
                {showPreview && (
                    <MediaPreview>
                        {previewUrl && (
                            <PreviewImage src={previewUrl} alt="Media preview" />
                        )}
                        <PreviewControls>
                            <FileName>{file?.name}</FileName>
                            <Box>
                                <IconButton
                                    size="small"
                                    onClick={handleCancelMedia}
                                    sx={{ color: '#EF4444', mr: 1 }}
                                >
                                    <Close fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={handleSendMedia}
                                    sx={{ color: '#10B981' }}
                                >
                                    <Send fontSize="small" />
                                </IconButton>
                            </Box>
                        </PreviewControls>
                    </MediaPreview>
                )}
                <InputField
                    placeholder="Type a message..."
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => sendText(e)}
                    value={value}
                    disabled={showPreview}
                />
            </Search>
        </Container>
    );
};

export default Footer;
