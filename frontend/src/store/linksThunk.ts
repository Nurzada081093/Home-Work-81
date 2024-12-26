import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../axiosRequest.ts';
import { ILinkForm } from '../types';

export const addLink = createAsyncThunk<void, ILinkForm>(
  'links/addLink',
  async (link) => {
    await axiosRequest.post(`links`, {...link});
  }
);