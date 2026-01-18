import { Box, styled, Typography } from '@mui/material';
import { AccountContext } from "../../../context/AccountProvider";
import { useContext } from "react";

const Component = styled(Box)`
    background: #0f172a;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%);
        top: -200px;
        right: -100px;
        border-radius: 50%;
    }

    &::after {
        content: '';
        position: absolute;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0) 70%);
        bottom: -150px;
        left: -100px;
        border-radius: 50%;
    }
`;

const Container = styled(Box)`
    text-align: center;
    z-index: 10;
    padding: 40px;
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(12px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    max-width: 500px;
    width: 90%;
`;

const Title = styled(Typography)`
    font-family: 'Outfit', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
`;

const UserName = styled('span')`
    color: #ffffff;
    font-weight: 800;
`;

const Subtitle = styled(Typography)`
    font-family: 'Inter', sans-serif;
    color: #94a3b8;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-top: 16px;
`;

const Divider = styled(Box)`
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    border-radius: 2px;
    margin: 24px auto;
`;

const EmptyChat = () => {
    const { account } = useContext(AccountContext);

    return (
        <Component>
            <Container>
                <Title variant="h1">
                    Welcome, <UserName>{account.name}</UserName>
                </Title>
                <Divider />
                <Subtitle>
                    Your conversations are encrypted and secure.
                    Select a contact from the menu to start messaging.
                </Subtitle>
            </Container>
        </Component>
    );
};

export default EmptyChat;
