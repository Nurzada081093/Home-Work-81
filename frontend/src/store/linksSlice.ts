import { createSlice } from '@reduxjs/toolkit';
import { ILink } from '../types';
import { addLink } from './linksThunk.ts';
import { RootState } from '../app/store.ts';

interface LinkStale {
  link: ILink | null;
  loading: boolean;
  error: boolean;
}

const initialState: LinkStale = {
  link: null,
  loading: false,
  error: false,
}

export const getOneLinkSlice = (state: RootState) => state.links.link;
export const addLinkSlice = (state: RootState) => state.links.loading;

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLink.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addLink.fulfilled, (state, {payload: link}) => {
        state.link = null;
        state.loading = false;
        state.error = false;
        state.link = link;
      })
      .addCase(addLink.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const linksReducers = linksSlice.reducer;