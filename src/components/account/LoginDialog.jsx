import { Dialog, Box, styled } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { addUser } from '../../service/api';

const OuterContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6A9AB0, #4F7D8E);
  padding: 20px;
`;

const DialogContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 20px;
  width: 400px;
  padding: 30px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 80%;
    padding: 20px;
  }
`;

const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 150px;
    height: auto;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      width: 120px;
    }
  }

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    color:rgb(39, 63, 71);
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  h3 {
    font-size: 1rem;
    font-weight: 400;
    color:rgb(42, 62, 71);
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const LoginSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  button {
    background-color: #6A9AB0;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #4F7D8E;
    }

    @media (max-width: 768px) {
      padding: 8px 15px;
      font-size: 0.9rem;
    }
  }
`;

const Footer = styled(Box)`
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #4F7D8E;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    console.log('Login Success Response:', res);  
    const decoded = jwtDecode(res.credential);
    setAccount(decoded);  
    await addUser(decoded);
    console.log('Decoded User Info:', decoded); 
  };

  const onLoginError = (error) => {
    console.error('Login Failed:', error); 
  };

  return (
    <OuterContainer>
      <Dialog open={true} PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}>
        <DialogContainer>
          <Header>
            <img src="../newlogo.png" alt="Logo" />
            <h1>Welcome to Chatify</h1>
            <h3>Login or Sign Up to start</h3>
          </Header>
          <LoginSection>
            <GoogleLogin 
              onSuccess={onLoginSuccess}
              onError={onLoginError}
            />
          </LoginSection>
          <Footer>
            <p>&copy; 2024 Chatify - Sarvjeet Swanshi.</p>
          </Footer>
        </DialogContainer>
      </Dialog>
    </OuterContainer>
  );
};

export default LoginDialog;
