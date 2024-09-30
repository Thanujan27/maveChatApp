import { createSlice } from "@reduxjs/toolkit";
// import { getDynamciVariables } from '../../utils/getFirbaseData';
import { dispatch } from "../store";

type UserState = {
  PhoneNo: any;
  contactName:any;
  maveNumbers:any;
  nonMaveNumbers:any;

  receiverId:any;
  receiverIds:any;

  profileId:any;
};
const initialState: UserState = {
  PhoneNo: undefined,
  contactName: undefined,
  maveNumbers:undefined,
  nonMaveNumbers:undefined,

  receiverId:undefined,
  receiverIds:undefined,

  profileId:undefined
};

const slice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setPhoneNo(state: { PhoneNo: any }, action: { payload: any }) {
      state.PhoneNo = action.payload;
    },

    updateProfileId(state: any, action: { payload: any }) {
      state.profileId = action.payload;
    },
    updateContactName(state: any, action: { payload: any }) {
      state.contactName = action.payload;
    },
    updateMaveNumbers(state: any, action: { payload: any }) {
      state.maveNumbers = action.payload;
    },
    updateNonMaveNumbers(state: any, action: { payload: any }) {
      state.nonMaveNumbers = action.payload;
    },
    updateReceiverId(state: any, action: { payload: any }) {
      state.receiverId = action.payload;
    },
    updateReceiverIds(state: any, action: { payload: any }) {
      state.receiverIds = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;
const { actions } = slice;

export const { setPhoneNo,updateReceiverIds, updateNonMaveNumbers,updateProfileId,updateContactName,updateMaveNumbers,updateReceiverId } = actions;
