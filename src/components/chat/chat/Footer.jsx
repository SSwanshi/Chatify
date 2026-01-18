import { Box, InputBase, styled, IconButton, Typography, Fade } from '@mui/material';
import { AddCircleOutline, Close, Send, Description } from '@mui/icons-material';
import { useEffect, useState, useRef, useCallback } from 'react';
import { UploadFile } from '../../../service/api';

const Container = styled(Box)`
    height: 70px;
    background: #0f172a;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const InputWrapper = styled(Box)`
    display: flex;
    align-items: center;
    background: rgba(30, 41, 59, 0.7);
    border-radius: 16px;
    padding: 8px 16px;
    flex: 1;
    margin: 0 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease-in-out;
    position: relative;

    &:focus-within {
        background: rgba(30, 41, 59, 0.9);
        border-color: rgba(99, 102, 241, 0.5);
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
    }
`;

const InputField = styled(InputBase)`
    width: 100%;
    font-size: 15px;
    color: #f8fafc;
    &::placeholder {
        color: #64748b;
    }
`;

const MediaPreview = styled(Box)`
    position: absolute;
    bottom: 80px;
    left: 0;
    right: 0;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(16px);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const PreviewImage = styled('img')`
    max-width: 100%;
    max-height: 250px;
    border-radius: 12px;
    object-fit: contain;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
`;

const FilePlaceholder = styled(Box)`
    width: 100px;
    height: 100px;
    background: rgba(30, 41, 59, 0.8);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #818cf8;
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
            if (response && response.data) {
                setImage(response.data);
                return response.data;
            }
        }
        return null;
    }, [file, setImage]);

    const handleCancelMedia = useCallback(() => {
        setShowPreview(false);
        setPreviewUrl('');
        setFile(null);
        setValue('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [setFile, setValue]);

    const handleSendMedia = useCallback(async () => {
        if (!file) return;

        const uploadedImageUrl = await uploadFile();

        const mockEvent = {
            keyCode: 13,
            which: 13,
            preventDefault: () => { },
            stopPropagation: () => { }
        };

        // Pass the updated value/image to sendText if necessary, 
        // but here we rely on the parent state update
        sendText(mockEvent);

        setShowPreview(false);
        setPreviewUrl('');
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [file, uploadFile, sendText, setFile]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showPreview) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMedia();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    handleCancelMedia();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showPreview, handleSendMedia, handleCancelMedia]);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setValue(selectedFile.name);
            setShowPreview(true);

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
            <input
                type='file'
                ref={fileInputRef}
                id='fileInput'
                style={{ display: 'none' }}
                onChange={onFileChange}
                accept="image/*,application/pdf"
            />

            <IconButton
                component="label"
                htmlFor="fileInput"
                sx={{ color: '#94a3b8', '&:hover': { color: '#818cf8', background: 'rgba(129, 140, 248, 0.1)' } }}
            >
                <AddCircleOutline />
            </IconButton>

            <InputWrapper>
                <Fade in={showPreview}>
                    <Box>
                        {showPreview && (
                            <MediaPreview>
                                {previewUrl ? (
                                    <PreviewImage src={previewUrl} alt="Preview" />
                                ) : (
                                    <FilePlaceholder>
                                        <Description sx={{ fontSize: 48 }} />
                                    </FilePlaceholder>
                                )}
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography sx={{ color: '#f8fafc', fontWeight: 500, mb: 0.5 }}>
                                        {file?.name}
                                    </Typography>
                                    <Typography sx={{ color: '#64748b', fontSize: 12 }}>
                                        Press Enter to send • Esc to cancel
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton
                                        onClick={handleCancelMedia}
                                        sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' } }}
                                    >
                                        <Close />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleSendMedia}
                                        sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.2)' } }}
                                    >
                                        <Send />
                                    </IconButton>
                                </Box>
                            </MediaPreview>
                        )}
                    </Box>
                </Fade>

                <InputField
                    placeholder="Message..."
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => !showPreview && sendText(e)}
                    value={value}
                    disabled={showPreview}
                    autoFocus
                />
            </InputWrapper>

            <IconButton
                onClick={(e) => {
                    const mockEvent = { keyCode: 13, which: 13, preventDefault: () => { } };
                    sendText(mockEvent);
                }}
                disabled={!value.trim() && !file}
                sx={{
                    color: '#818cf8',
                    '&:hover': { background: 'rgba(129, 140, 248, 0.1)' },
                    '&.Mui-disabled': { color: '#334155' }
                }}
            >
                <Send />
            </IconButton>
        </Container>
    );
};

export default Footer;

