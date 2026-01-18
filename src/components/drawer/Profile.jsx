import { useContext } from "react";
import { Box, styled, Typography, Avatar } from "@mui/material";
import { AccountContext } from "../../context/AccountProvider";

const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
    padding: 30px 0;
    background: #0f172a;
`;

const StyledAvatar = styled(Avatar)`
    width: 180px;
    height: 180px;
    border-radius: 24px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
`;

const BoxWrapper = styled(Box)`
    background: rgba(30, 41, 59, 0.4);
    padding: 20px 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    & :first-of-type {
        font-size: 13px;
        color: #6366f1; /* Indigo accent instead of green */
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
    };
    & :last-of-type {
        color: #f8fafc;
        font-size: 16px;
        font-family: 'Inter', sans-serif;
    }
`;

const DescriptionContainer = styled(Box)`
    padding: 15px 30px 25px;
    & > p {
        color: #94a3b8;
        font-size: 13px;
        line-height: 1.6;
        font-family: 'Inter', sans-serif;
    }
`;

const Profile = () => {
    const { account } = useContext(AccountContext);

    return (
        <Box sx={{ background: '#0f172a', height: '100%' }}>
            <ImageContainer>
                <StyledAvatar src={account.picture} alt="displaypicture" variant="rounded" />
            </ImageContainer>

            <BoxWrapper>
                <Typography>Your Name</Typography>
                <Typography>{account.name}</Typography>
            </BoxWrapper>

            <DescriptionContainer>
                <Typography>
                    This is not your username or pin. This name will be visible to your contacts.
                </Typography>
            </DescriptionContainer>

            <BoxWrapper>
                <Typography>About</Typography>
                <Typography>Eat! Sleep! Code! Repeat</Typography>
            </BoxWrapper>
        </Box>
    );
};

export default Profile;
