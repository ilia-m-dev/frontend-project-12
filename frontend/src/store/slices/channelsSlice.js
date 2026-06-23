import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const initialState = {
  items: [],
  currentChannelId: defaultChannelId,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.items = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId ?? defaultChannelId;
    },
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
    addChannel(state, action) {
      state.items.push(action.payload);
    },
    removeChannel(state, action) {
      const { id } = action.payload;
      state.items = state.items.filter((channel) => channel.id !== id);

      if (state.currentChannelId === id) {
        state.currentChannelId = defaultChannelId;
      }
    },
    renameChannel(state, action) {
      const { id, name } = action.payload;
      const channel = state.items.find((channel) => channel.id === id);
      if (channel) {
        channel.name = name;
      }
    },
  },
});

export const { setChannels, setCurrentChannelId, addChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;