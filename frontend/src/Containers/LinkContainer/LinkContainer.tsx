import { Box, Container } from '@mui/joy';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { ILinkForm } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getOneLinkSlice } from '../../store/linksSlice.ts';
import { addLink } from '../../store/linksThunk.ts';
import { Link, Typography } from '@mui/material';

const LinkContainer = () => {
  const oneLink = useAppSelector(getOneLinkSlice);
  const dispatch = useAppDispatch();

  const addNewLink = async (originalURL: ILinkForm) => {
    dispatch(addLink({...originalURL}));
  };

  return (
    <Container>
      <FormElement addLink={addNewLink}/>
      <Typography variant="h3" sx={{marginBottom: '15px', textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>Your link now looks like this:</Typography>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {oneLink !== null ?
            <Link sx={{fontSize: '30px', '&:hover': {textDecoration: 'none', color: 'whitesmoke'}}} href={`http://localhost:8000/${oneLink.shortURL}`}>{`http://localhost:8000/${oneLink.shortURL}`}</Link> :
            <Typography sx={{textAlign: 'center', color: 'white', fontSize: '30px'}}>There is no link yet!</Typography>
          }
        </Box>
    </Container>
  );
};

export default LinkContainer;