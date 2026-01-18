import { useContext, useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { AccountContext } from "../../../context/AccountProvider";
import { Chat as MessageIcon } from '@mui/icons-material';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';



const Component = styled(Box)`
    height: 44px;
    background: #070F2B;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    border-radius: 14px;
    margin-top: 7px;
    margin-left: 5px;
`;

const Wrapper = styled(Box)`
    margin-left: auto;
    color: #F4F6FF;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Image = styled('img')({
    height: 40,
    width: 40,
    borderRadius: '50%',
    marginRight: 8, 
});

const DisplayName = styled(Box)`
    color: #F4F6FF;
    font-size: 16px; 
    margin-left: 10px;
`;

const Baap = styled(Box)`
  
`

const Header = () => {

  const [openDrawer, setOpenDrawer] = useState(false);

  const { account } = useContext(AccountContext);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  }

  useEffect(() => {
    console.log('User Account Info:', account);
    console.log('Profile Picture URL:', account?.picture); 
  }, [account]);

  return (
    
    <Baap>
      <Component>
      <Image src={account?.picture || '/avatar.jpeg'} alt="dp" onClick={toggleDrawer}/>
      <DisplayName>
        {account.name}
      </DisplayName>
      <Wrapper>
        <MessageIcon sx={{ fontSize: 23 }} /> 
        <HeaderMenu  setOpenDrawer={setOpenDrawer}/>
      </Wrapper>
    </Component>
    <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
    
    </Baap>
    
    
  );
};

export default Header;
