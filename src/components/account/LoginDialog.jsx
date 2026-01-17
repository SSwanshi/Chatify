import { Dialog, Box, Typography, styled, Fade } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { addUser } from '../../service/api';

const Container = styled(Box)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at top right, #1e293b, #0f172a);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -10%;
        left: -10%;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(80px);
        z-index: 0;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -10%;
        right: -10%;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(100px);
        z-index: 0;
    }
`;

const GlassCard = styled(Box)`
    position: relative;
    z-index: 10;
    width: 450px;
    padding: 3rem; 
    border-radius: 24px;
    background: rgba(30, 41, 59, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;

    @media (max-width: 600px) {
        width: 90%;
        padding: 2rem;
    }
`;

const Logo = styled('img')`
    width: 80px;
    height: 80px;
    border-radius: 20px;
    margin-bottom: 1rem;
    box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.5);
`;

const Title = styled(Typography)`
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 2.5rem;
    background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
`;

const Subtitle = styled(Typography)`
    font-family: 'Outfit', sans-serif;
    color: #94a3b8;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
`;

const StyledDialog = styled(Dialog)`
    .MuiPaper-root {
        background: transparent;
        box-shadow: none;
        overflow: visible;
        max-width: none;
        max-height: none;
        margin: 0;
    }
`;

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    try {
      const decoded = jwtDecode(res.credential);
      setAccount(decoded);
      await addUser(decoded);
    } catch (error) {
      console.error('Login processing error:', error);
    }
  };

  const onLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <Container>
      <StyledDialog
        open={true}
        hideBackdrop={true}
      >
        <Fade in={true} timeout={1000}>
          <GlassCard>
            <Logo src="/logo192.png" alt="Chatify Logo" />
            <Box>
              <Title variant="h1">Chatify</Title>
              <Subtitle>
                Experience a new era of messaging.<br />
                Secure, fast, and beautiful.
              </Subtitle>
            </Box>

            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginError}
              theme="filled_black"
              shape="pill"
              size="large"
            />
          </GlassCard>
        </Fade>
      </StyledDialog>
    </Container>
  );
};

export default LoginDialog;
