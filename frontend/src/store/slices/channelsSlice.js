import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.items = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
  },
});

export const { setChannels, setCurrentChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;