import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.items = action.payload;
    },
    addMessage(state, action) {
      state.items.push(action.payload);
    },
    removeMessageByChannelId(state, action) {
      const { id } = action.payload;
      state.items = state.items.filter((message) => message.channelId !== id);
    }
  },
});

export const { setMessages, addMessage, removeMessageByChannelId } = messagesSlice.actions;

export default messagesSlice.reducer;