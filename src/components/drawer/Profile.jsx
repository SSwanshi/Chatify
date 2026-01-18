import { useContext } from "react";
import { Box, styled, Typography } from "@mui/material"

import { AccountContext } from "../../context/AccountProvider";

const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

const Image = styled('img')({
    width: 200,
    height: 200,
    borderRadius: '50%',
    padding: '25px 0'
});

const BoxWrapper = styled(Box)`
    background: rgba(30, 41, 59, 0.4); // Semi transparent card
    padding: 12px 30px 12px; // Adjusted padding
    margin: 10px 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    & :first-child { // first-of-type selector in emotion/styled
        font-size: 13px;
        color: #38bdf8; // distinct color for label
        font-weight: 200;
    };
    & :last-child {
        margin: 14px 0;
        color: #f1f5f9; // white text for value
    }
`;

const DescriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p {
        color: #94a3b8;
        font-size: 13px;
    }
`;

const Profile = () => {

    const { account } = useContext(AccountContext);

    return (
        <>
            <ImageContainer>
                <Image src={account.picture} alt="displaypicture" />
            </ImageContainer>
            <BoxWrapper>
                <Typography>Your name</Typography>
                <Typography>{account.name}</Typography>
            </BoxWrapper>
            <DescriptionContainer>
                <Typography>This is not your username or pin. This name will be visible to your contacts.</Typography>
            </DescriptionContainer>
            <BoxWrapper>
                <Typography>About</Typography>
                <Typography>Eat! Sleep! Code! Repeat</Typography>
            </BoxWrapper>
        </>
    )
}

export default Profile;