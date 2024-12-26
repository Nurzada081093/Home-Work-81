import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Box } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
import { ILinkForm } from '../../types';
import { toast } from 'react-toastify';
import { Typography, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../app/hooks.ts';
import { addLinkSlice } from '../../store/linksSlice.ts';

interface Props {
  addLink: (originalURL: ILinkForm) => void;
}

const initialLink = {
  originalURL: ''
};

const FormElement:React.FC<Props> = ({addLink}) => {
  const [newLink, setNewLink] = useState<ILinkForm>(initialLink);
  const addLoading = useAppSelector(addLinkSlice);

  const getNewLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const createNewLink = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newLink.originalURL.trim().length === 0) {
      toast.error('Fill in the link!');
    } else {
      addLink({...newLink});
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 10,
        p: "30px",
        backgroundColor: "rgba(157,165,163,0.68)",
        margin: '5%'
      }}
    >
      <Typography variant="h2" sx={{marginBottom: '15px', textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>Shorten your link!</Typography>
      <form onSubmit={createNewLink}>
        <Stack spacing={2}>
          <Input
            type="text"
            value={newLink.originalURL}
            id="originalURL"
            name="originalURL"
            onChange={getNewLink}
            placeholder="Enter URL here..."
            style={{height:'50px'}}
          />
          <Button type="submit"
                  disabled={addLoading}
          >
            Shorten!
            {addLoading ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FormElement;