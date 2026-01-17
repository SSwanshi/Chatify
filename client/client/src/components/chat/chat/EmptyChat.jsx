import { Box, styled, Typography } from '@mui/material';
import { AccountContext } from "../../../context/AccountProvider";
import { useContext } from "react";

const Container = styled(Box)`
    background: transparent;
    height: 100%;
    padding: 0;
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const Image = styled('img')({
    width: 300,
    marginBottom: 40,
    borderRadius: 20,
    opacity: 0.8 // Blend it a bit
});

const Title = styled(Typography)`
    font-size: 2rem;
    color: #e2e8f0;
    font-weight: 300;
    font-family: 'Outfit', sans-serif;
`;

const Subtitle = styled(Typography)`
    font-size: 1rem;
    color: #94a3b8;
    margin-top: 10px;
    font-family: 'Outfit', sans-serif;
`;

const EmptyChat = () => {
    const { account } = useContext(AccountContext);

    return (
        <Container>
            <Image src="https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif" alt="Welcome" />
            <Title>Welcome, {account.name}</Title>
            <Subtitle>Select a chat to start messaging</Subtitle>
        </Container>
    )
}

export default EmptyChat;