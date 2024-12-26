import { createSlice } from '@reduxjs/toolkit';
import { ILink } from '../types';
import { addLink } from './linksThunk.ts';
import { RootState } from '../app/store.ts';

interface LinkStale {
  link: ILink | null;
  loadings: {
    addLink: boolean;
    getLinks: boolean;
  },
  error: boolean;
}

const initialState: LinkStale = {
  link: null,
  loadings: {
    addLink: false,
    getLinks: false,
  },
  error: false,
}

export const addLinkSlice = (state: RootState) => state.links.loadings.addLink;

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLink.pending, (state) => {
        state.loadings.addLink = true;
        state.error = false;
      })
      .addCase(addLink.fulfilled, (state) => {
        state.loadings.addLink = false;
        state.error = false;
      })
      .addCase(addLink.rejected, (state) => {
      state.loadings.addLink = false;
      state.error = true;
    });
  },
});

export const linksReducers = linksSlice.reducer;