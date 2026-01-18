import { Box, InputBase, styled, IconButton, Typography, Fade, Snackbar, Alert, CircularProgress } from '@mui/material';
import { AddCircleOutline, Close, Send, Description } from '@mui/icons-material';
import { useEffect, useState, useRef, useCallback } from 'react';
import { UploadFile } from '../../../service/api';

const Container = styled(Box)(({ theme }) => ({
    height: '70px',
    background: '#0f172a',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        padding: '0 8px'
    }
}));

const InputWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(30, 41, 59, 0.7)',
    borderRadius: '16px',
    padding: '8px 16px',
    flex: 1,
    margin: '0 12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        margin: '0 8px',
        padding: '8px 12px'
    },
    '&:focus-within': {
        background: 'rgba(30, 41, 59, 0.9)',
        borderColor: 'rgba(99, 102, 241, 0.5)',
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.1)',
    }
}));

const MediaPreview = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '80px',
    left: '0',
    right: '0',
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(16px)',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    [theme.breakpoints.down('sm')]: {
        left: '8px',
        right: '8px',
        padding: '16px'
    }
}));

const InputField = styled(InputBase)`
    width: 100%;
    font-size: 15px;
    color: #f8fafc;
    &::placeholder {
        color: #64748b;
    }
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
    const [loading, setLoading] = useState(false);
    const [openToaster, setOpenToaster] = useState(false);
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
        if (!file || loading) return;

        setLoading(true);
        setOpenToaster(true);

        try {
            const uploadedImageUrl = await uploadFile();

            const mockEvent = {
                keyCode: 13,
                which: 13,
                preventDefault: () => { },
                stopPropagation: () => { }
            };

            await sendText(mockEvent, uploadedImageUrl);

            setShowPreview(false);
            setPreviewUrl('');
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error("Error sending media:", error);
        } finally {
            setLoading(false);
            setOpenToaster(false);
        }
    }, [file, uploadFile, sendText, setFile, loading]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showPreview && !loading) {
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
    }, [showPreview, handleSendMedia, handleCancelMedia, loading]);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setValue(selectedFile.name);
            setShowPreview(true);

            if (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/')) {
                const url = URL.createObjectURL(selectedFile);
                setPreviewUrl(url);
            } else {
                setPreviewUrl('');
            }
        }
    }

    const handleToasterClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenToaster(false);
    };

    return (
        <Container>
            <input
                type='file'
                ref={fileInputRef}
                id='fileInput'
                style={{ display: 'none' }}
                onChange={onFileChange}
                accept="image/*,video/*,application/pdf"
            />

            <IconButton
                component="label"
                htmlFor="fileInput"
                disabled={loading}
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
                                    file?.type?.startsWith('video/') ? (
                                        <video
                                            src={previewUrl}
                                            style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '12px' }}
                                            controls={!loading}
                                        />
                                    ) : (
                                        <PreviewImage src={previewUrl} alt="Preview" />
                                    )
                                ) : (
                                    <FilePlaceholder>
                                        <Description sx={{ fontSize: 48 }} />
                                    </FilePlaceholder>
                                )}
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography sx={{ color: '#f8fafc', fontWeight: 500, mb: 0.5 }}>
                                        {file?.name}
                                    </Typography>
                                    {!loading && (
                                        <Typography sx={{ color: '#64748b', fontSize: 12 }}>
                                            Press Enter to send • Esc to cancel
                                        </Typography>
                                    )}
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton
                                        onClick={handleCancelMedia}
                                        disabled={loading}
                                        sx={{
                                            bgcolor: loading ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: loading ? '#ffffff !important' : '#ef4444',
                                            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' },
                                            '&.Mui-disabled': { color: '#ffffff', opacity: 0.6 }
                                        }}
                                    >
                                        <Close />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleSendMedia}
                                        disabled={loading}
                                        sx={{
                                            bgcolor: loading ? 'rgba(255, 255, 255, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                            color: loading ? '#ffffff !important' : '#10b981',
                                            '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.2)' },
                                            '&.Mui-disabled': { color: '#ffffff', opacity: 0.6 }
                                        }}
                                    >
                                        {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : <Send />}
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
                    disabled={showPreview || loading}
                    autoFocus
                />
            </InputWrapper>

            <IconButton
                onClick={(e) => {
                    const mockEvent = { keyCode: 13, which: 13, preventDefault: () => { } };
                    sendText(mockEvent);
                }}
                disabled={(!value.trim() && !file) || loading}
                sx={{
                    color: '#818cf8',
                    '&:hover': { background: 'rgba(129, 140, 248, 0.1)' },
                    '&.Mui-disabled': { color: '#334155' }
                }}
            >
                <Send />
            </IconButton>

            <Snackbar
                open={openToaster}
                autoHideDuration={6000}
                onClose={handleToasterClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleToasterClose}
                    severity="info"
                    variant="filled"
                    sx={{
                        width: '100%',
                        bgcolor: '#1e293b',
                        color: '#f8fafc',
                        '& .MuiAlert-icon': { color: '#818cf8' }
                    }}
                >
                    Please wait for the media to be sent...
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Footer;


