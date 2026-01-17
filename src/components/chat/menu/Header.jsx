import { useContext, useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { AccountContext } from "../../../context/AccountProvider";
import { Chat as MessageIcon } from '@mui/icons-material';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';



const Component = styled(Box)`
    height: 60px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    gap: 15px;
    color: #e2e8f0;
`;

const Image = styled('img')({
  height: 48,
  width: 48,
  borderRadius: '50%',
  cursor: 'pointer',
  border: '2px solid rgba(59, 130, 246, 0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#3b82f6',
    transform: 'scale(1.05)'
  }
});

const DisplayName = styled(Box)`
    color: #f1f5f9;
    font-size: 1.1rem; 
    font-weight: 600;
    margin-left: 15px;
    flex: 1;
`;

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

    <>
      <Component>
        <Image src={account?.picture || '/avatar.jpeg'} alt="dp" onClick={toggleDrawer} />
        <DisplayName>
          {account.name}
        </DisplayName>
        <Wrapper>
          <MessageIcon sx={{ fontSize: 24 }} />
          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />

    </>


  );
};

export default Header;
