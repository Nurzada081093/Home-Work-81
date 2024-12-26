import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../axiosRequest.ts';
import { ILink, ILinkForm } from '../types';


export const addLink = createAsyncThunk<ILink, ILinkForm>(
  'links/addLink',
  async (link) => {
    const postURL = await axiosRequest.post('/links', {...link});
    return postURL.data;
  }
);

