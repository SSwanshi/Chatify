import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { Box, styled } from '@mui/material';

const Component = styled(Box)`
    background: #1F2937;
    height: 45px;
    border-bottom: 1px solid #374151;
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
        color: #9CA3AF;
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
