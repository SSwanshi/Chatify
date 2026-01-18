import { useContext, useState } from 'react';
import { Box, styled, Tooltip } from '@mui/material';
import { AccountContext } from "../../../context/AccountProvider";
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';

const Component = styled(Box)(({ theme }) => ({
  height: '70px',
  background: '#0f172a',
  display: 'flex',
  padding: '0 24px',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  [theme.breakpoints.down('sm')]: {
    padding: '0 16px'
  }
}));


const Image = styled('img')({
  height: 44,
  width: 44,
  borderRadius: '12px',
  cursor: 'pointer',
  objectFit: 'cover',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
});

const Wrapper = styled(Box)`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { account } = useContext(AccountContext);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Component>
        <Tooltip title="Profile">
          <Image src={account?.picture || '/avatar.jpeg'} alt="dp" onClick={toggleDrawer} />
        </Tooltip>

        <Wrapper>

          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
    </>
  );
};

export default Header;

