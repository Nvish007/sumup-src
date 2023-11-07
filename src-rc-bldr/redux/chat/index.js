import auth from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {callPostAPI} from '../../utils/axios';
import {loadingStart, loadingEnd} from '../common/slice';
import AuthService from '../../services/auth';
import { addUserToChatEnd, addUserToChatStart, listChatUsersFinish, loginSucess, searchUserFinish } from './slice';
import { updateToken } from '../../utils/fcm';
import UserService from '../../services/user';


export const listChatUsers = createAsyncThunk(
    'list',
    async (params, {rejectWithValue, dispatch}) => {
        try {
            const { user, type } = params;
            dispatch(loadingStart());
            const response = await UserService.getRoomList(user, type);
            console.log('response', response);
            dispatch(listChatUsersFinish(response));
            if (params.callback) {
                params.callback(response);
                return
            }
            if (params.onResponse) {
                params.onResponse(response);
            }
        } catch (err) {
            console.log('err', err);
        } 
    }
)

export const sendMessagesById = createAsyncThunk(
    'sendMessage',
    async (params, {rejectWithValue, dispatch}) => {
        try {
            const response = await UserService.setMessages(params.roomId, params.data);
            console.log('response sendMessage', response);
            // params.callback(response);
        } catch (err) {
            console.log('error', err);
        }
    }
)

export const handleSearchUser = createAsyncThunk(
    'search',
    async (params, {rejectWithValue, dispatch}) => {
        try {
            dispatch(addUserToChatStart());
            const { value, user } = params;
            const response = await UserService.searchedUser(value, user);
            console.log('response search', response);
            if (response.length > 0) {
                dispatch(searchUserFinish(response));
                return;
            }
            dispatch(searchUserFinish([]));
        } catch (err) {
            console.log('error from handle search', err);
            
        }
    }
)

export const addUserToChat = createAsyncThunk(
    'add',
    async (params, {rejectWithValue, dispatch}) => {
        try {
            // dispatch(addUserToChatStart());
            const { user1, user2 } = params;
            console.log('user1', user1, 'user2', user2);
            const response = await UserService.addUserToRoom(user1, user2);
            console.log('response add', response);
            if (response.result === 'path') {
                dispatch(addUserToChatEnd(response.documentId));
                params.onCallback(response, user2);
            }
        } catch (err) {
            console.log('err form add user', err);
        }
    }
)

export const readMessagesById = createAsyncThunk(
    'readMessage',
    async (params, {rejectWithValue, dispatch}) => {
        try {
            const response = await UserService.updateMessages(params.messageId, params.uid);
            console.log('response', response);
        } catch (err) {
            console.log('err form read message', err);
        }
    }
)
