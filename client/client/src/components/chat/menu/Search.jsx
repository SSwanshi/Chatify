import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { Box, styled } from '@mui/material';

const Component = styled(Box)`
    background: rgba(30, 41, 59, 0.5);
    height: 48px;
    display: flex;
    align-items: center;
    margin: 10px 15px; // Add some margin around the search bar
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: box-shadow 0.3s ease;

    &:focus-within {
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        background: rgba(30, 41, 59, 0.8);
    }
`;

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 10px;
`;

const Icon = styled(Box)`
    display: flex;
    align-items: center;
    color: #94a3b8;
    margin-right: 10px; 
`;

const InputField = styled(InputBase)`
    flex: 1;
    height: 100%; 
    color: #f1f5f9;
    font-size: 0.95rem;

    &::placeholder {
        color: #64748b; 
    }
`;

const Search = ({ setText }) => {
    return (
        <Component>
            <Wrapper>
                <Icon>
                    <SearchIcon />
                </Icon>
                <InputField
                    placeholder='Search or start new chat'
                    onChange={(e) => setText(e.target.value)}
                />
            </Wrapper>
        </Component>
    );
};

export default Search;
