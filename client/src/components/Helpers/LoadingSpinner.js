import CircularProgress from "@material-ui/core/CircularProgress";
import styled from 'styled-components';

export const LoadingSpinner = () => {
    return (
        <LoadingWrapper>
            <CircularProgress />        
        </LoadingWrapper>
    )
}


export const LittleLoader = () => {
    return (
        <LoadingWrapper>
            <CircularProgress />        
        </LoadingWrapper>
    )
} 

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
`