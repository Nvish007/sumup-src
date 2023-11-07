import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	userList: null,
	chatList: null,
	user2: null,
	earnings: null,
	creditCount: null,
	spendings: null,
	addedUserId: null,
	badgeCount: 0,
	chatBadge: 0,
	updatedNote: null
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        listChatUsersFinish: (state, {payload}) => {
			console.log('payload list', payload);
            state.chatList = payload
        },
		searchUserFinish: (state, {payload}) => {
			console.log('payload search', payload);
			state.userList = payload
		},
		addUserToChatEnd: (state, {payload}) => {
			console.log('payload add', payload);
			state.addedUserId = payload
		},
		addUserToChatStart: (state, {payload}) => {
			console.log('payload start', payload);
			state.addedUserId = null
		}
    }
});

export const { listChatUsersFinish, searchUserFinish, addUserToChatEnd, addUserToChatStart } = chatSlice.actions;

export default chatSlice.reducer;
