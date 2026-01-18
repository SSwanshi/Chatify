import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase, Box, styled } from '@mui/material';

const Component = styled(Box)`
    background: #0f172a;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 16px;
`;

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    background: rgba(30, 41, 59, 0.7);
    border-radius: 12px;
    padding: 8px 16px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease-in-out;

    &:focus-within {
        background: rgba(30, 41, 59, 0.9);
        border-color: rgba(99, 102, 241, 0.5);
    }
`;

const Icon = styled(Box)`
    display: flex;
    align-items: center;
    margin-right: 12px;
    color: #94a3b8;
`;

const InputField = styled(InputBase)`
    flex: 1;
    color: #f8fafc;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    &::placeholder {
        color: #64748b;
    }
`;

const Search = ({ setText }) => {
    return (
        <Component>
            <Wrapper>
                <Icon>
                    <SearchIcon fontSize="small" />
                </Icon>
                <InputField
                    placeholder='Search or start a new chat...'
                    onChange={(e) => setText(e.target.value)}
                />
            </Wrapper>
        </Component>
    );
};

export default Search;

