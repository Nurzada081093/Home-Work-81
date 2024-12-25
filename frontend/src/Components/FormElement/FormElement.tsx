import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Box } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
import { ILinkForm } from '../../types';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';

interface Props {
  addLink: (link: ILinkForm) => void;
}

const initialLink = {
  link: ''
};

const FormElement:React.FC<Props> = ({addLink}) => {
  const [newLink, setNewLink] = useState<ILinkForm>(initialLink);

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

    if (newLink.link.trim().length === 0) {
      toast.error('Fill in the link!');
    } else {
      addLink({...newLink});
      setNewLink(initialLink);
    }
  };


  return (
    <Box
      sx={{
        borderRadius: 10,
        p: "30px",
        backgroundColor: "rgba(157,165,163,0.68)",
        margin: '15%'
      }}
    >
      <Typography variant="h2" sx={{marginBottom: '15px', textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>Shorten your link!</Typography>
      <form onSubmit={createNewLink}>
        <Stack spacing={2}>
          <Input
            type="text"
            value={newLink.link}
            id="link"
            name="link"
            onChange={getNewLink}
            placeholder="Enter URL here..."
            style={{height:'50px'}}
          />
          {/*<Textarea*/}
          {/*  value={newComment.description}*/}
          {/*  id="description"*/}
          {/*  name="description"*/}
          {/*  onChange={getNewComment}*/}
          {/*  placeholder="Enter your message..."*/}
          {/*  minRows={3}*/}
          {/*/>*/}
          <Button type="submit"
                  // disabled={loaderPost}
          >
            Shorten!
            {/*{loaderPost ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}*/}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FormElement;