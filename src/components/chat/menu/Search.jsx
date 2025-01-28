import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { Box, styled } from '@mui/material';

const Component = styled(Box)`
    background: #fff;
    height: 45px;
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-top: 4px;
    margin-left: 5px;
    border-radius: 14px;
`;

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    width: 100%;
`;

const Icon = styled(Box)`
    display: flex;
    align-items: center;
    margin-right: 10px; 
`;

const InputField = styled(InputBase)`
    flex: 1;
    height: 100%; 
    &::placeholder {
        color: #B0B0B0; 
    }
`;

const Search = ({setText}) => {
    return (
        <Component>
            <Wrapper>
                <Icon>
                    <SearchIcon />
                </Icon>
                <InputField
                    placeholder='Search or start new chat'
                    onChange={(e)=>setText(e.target.value)}
                />
            </Wrapper>
        </Component>
    );
};

export default Search;
