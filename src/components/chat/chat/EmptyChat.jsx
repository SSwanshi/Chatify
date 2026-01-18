import { Box, styled, Typography } from '@mui/material';
import { AccountContext } from "../../../context/AccountProvider";
import { useContext } from "react";


const Container = styled(Box)`
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 100vh;
    flex-direction: column;
`

const GifImage = styled('img')({
    height: 250,
    width: 250,
    borderRadius: '50%',
});

const Welcome1 = styled(Typography)`
    color: #fff;
    font-size: 1.8rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    text-align: center;
    padding: 10px 20px;
    margin: 20px 0;
    
`;

const Welcome = styled(Typography)`
    color: #fff;
    font-size: 1.8rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    text-align: center;
    padding: 10px 20px;
    margin: 20px 0;
    background: linear-gradient(135deg, #2193b0, #6dd5ed);
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    }
`;

const NewFooter = styled(Box)`
    text-align: center;
    padding: 10px;
    background-color: #f1f1f1;
    color: #333;
    font-size: 0.9rem;
`;

const EmptyChat = () => {

    const { account } = useContext(AccountContext);

    return (
        <Container>
            <Box>
                <Container>
                    <GifImage src="https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif" alt="Hello GIF" />
                    <Box>
                        <Welcome1 variant="h5" component="div">
                            <p>Welcome 🤘</p>
                            <Welcome>{account.name}</Welcome>
                            <p>Select any Contact ID to Start a Chat</p>
                            <NewFooter >

                            </NewFooter>
                        </Welcome1>
                    </Box>
                </Container>
            </Box>


        </Container>

    )
}

export default EmptyChat;