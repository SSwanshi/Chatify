import { Box, InputBase, styled, IconButton } from '@mui/material';
import { AttachFile, EmojiEmotionsOutlined, Close } from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import { UploadFile } from '../../../service/api';

const Container = styled(Box)`
    height: 70px;
    background: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    & > svg, & > label > svg {
        color: #94a3b8;
        cursor: pointer;
        transition: color 0.2s;
        &:hover {
            color: #f1f5f9;
        }
    }
    
    & > * {
        margin: 0 8px;
    }
`;

const Search = styled(Box)`
    background-color: rgba(30, 41, 59, 0.6);
    border-radius: 12px;
    width: 100%;
    margin-left: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;

    &:focus-within {
        background-color: rgba(30, 41, 59, 0.9);
        border-color: rgba(59, 130, 246, 0.5);
    }
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 12px 20px;
    font-size: 15px;
    color: #f1f5f9;
    
    & .MuiInputBase-input::placeholder {
        color: #64748b;
        opacity: 1;
    }
`;

const PreviewOverlay = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 20px;
    outline: none; // Remove focus outline
`;

const PreviewContainer = styled(Box)`
    max-width: 90%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const PreviewMedia = styled(Box)`
    max-width: 100%;
    max-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img, video {
        max-width: 100%;
        max-height: 70vh;
        border-radius: 12px;
    }
`;

const PreviewActions = styled(Box)`
    display: flex;
    gap: 15px;
    align-items: center;
    color: #f1f5f9;
    font-size: 14px;
`;

const Footer = ({ sendText, setValue, value, file, setFile, setImage, image }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const previewRef = useRef(null);

    // Auto-focus preview when it opens
    useEffect(() => {
        if (previewUrl && previewRef.current) {
            previewRef.current.focus();
        }
    }, [previewUrl]);

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
    }, [file])

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setValue(selectedFile.name);

            // Create preview URL
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        }
    }

    const handleCancelPreview = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setFile(null);
        setValue('');
        setImage('');
        // Reset file input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
    }

    const handlePreviewKeyDown = async (e) => {
        if (e.key === 'Enter') {
            // Wait a bit to ensure upload is complete if needed
            if (file && !image) {
                // Upload is still in progress, wait a moment
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            sendText(e);
            handleCancelPreview();
        } else if (e.key === 'Escape') {
            handleCancelPreview();
        }
    }

    const isVideo = (filename) => {
        return filename?.match(/\.(mp4|webm|mov|avi|mkv)$/i);
    };

    const isPDF = (filename) => {
        return filename?.includes('.pdf');
    };

    return (
        <>
            {previewUrl && (
                <PreviewOverlay ref={previewRef} onKeyDown={handlePreviewKeyDown} tabIndex={0}>
                    <PreviewContainer>
                        <PreviewMedia>
                            {isPDF(file?.name) ? (
                                <Box style={{ color: '#f1f5f9', textAlign: 'center' }}>
                                    <Box style={{ fontSize: '48px', marginBottom: '10px' }}>📄</Box>
                                    <Box>{file?.name}</Box>
                                </Box>
                            ) : isVideo(file?.name) ? (
                                <video controls src={previewUrl} />
                            ) : (
                                <img src={previewUrl} alt="Preview" />
                            )}
                        </PreviewMedia>
                        <PreviewActions>
                            <IconButton
                                onClick={handleCancelPreview}
                                style={{ color: '#f87171' }}
                            >
                                <Close />
                            </IconButton>
                            <span>Press Enter to send or Esc to cancel</span>
                        </PreviewActions>
                    </PreviewContainer>
                </PreviewOverlay>
            )}
            <Container>
                <EmojiEmotionsOutlined />
                <label htmlFor="fileInput">
                    <AttachFile />
                </label>

                <input type='file'
                    id='fileInput'
                    style={{ display: 'none' }}
                    onChange={(e) => onFileChange(e)}
                    accept="image/*,video/*,.pdf"
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
        </>
    );
};

export default Footer;
