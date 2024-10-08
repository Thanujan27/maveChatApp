import axios from 'axios';
import {Alert} from 'react-native';

export async function getOTPVerificationCode(phone_no: string) {
  try {
    const url = `http://3.109.218.138:8080/user/get-otp/${phone_no}`;
    const response = await axios.post(url, null, {withCredentials: true});
    return response.data;
  } catch (error: any) {
    console.error('getOTPVerificationCode Error:', error);
    Alert.alert('Error', error.message || 'An unexpected error occurred.', [
      {
        text: 'OK',
        onPress: () => console.log('Alert dismissed'),
      },
    ]);
    throw error;
  }
}

export async function getUserDetails(user_id: string) {
  try {
    const url = `http://3.109.218.138:8080/user/${user_id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('getdasDetails Error:', error);
    throw error;
  }
}

export async function dashboardChats(user_id: string) {
  try {
    const url = `http://3.109.218.138:8088/chat/get-all-by-profileId?profileId=${user_id}&userTab=PERSONAL`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('dashboardChats Error:', error);
    throw error;
  }
}

export async function validateVerificationOTPCode(
  phone_no: string,
  otp: string,
  token: any,
) {
  try {
    const url = `http://3.109.218.138:8080/user/verification?phone_no=${phone_no}&otp=${otp}&token=${token}`;
    console.log(url);
    const response = await axios.post(url, null, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('getOTPVerificationCode Error:', error);
    throw error;
  }
}
export async function mediaImageUpload(
  chatId: string,
  senderProfileId: string,
  receiverProfileId: any,
  file: any,
  messageId: any,
  message: any,
) {
  try {
    const url = `http://3.109.218.138:8088/chat/${senderProfileId}/chat/${receiverProfileId}/media`;
    console.log(url);
    const formData = new FormData();

    const userRequest = {
      chatId,
      messageId,
      message,
    };

    formData.append('messageRequest', JSON.stringify(userRequest));
    formData.append('mediaFiles', file); // Replace 'file' with the actual file object

    const headers = {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      Accept: ['application/json', 'text/plain', '*/*'].join(', '),
    };
    console.log(url);
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: ['application/json', 'text/plain', '*/*'].join(', '),
      },
      withCredentials: true,
    });
    console.log(response, 'response');
  } catch (error) {
    console.error('mediaImageUpload Error:', error);
    throw error;
  }
}

export async function signupDatas(
  userName: any,
  email: any,
  phoneNo: any,
  dateOfBirth: any,
  gender: any,
  profileImage: any,
) {
  try {
    const formData = new FormData();

    // Create userRequest object
    const userRequest = {
      userName,
      email,
      phoneNo,
      dateOfBirth,
      gender,
    };

    // Append the userRequest object as a JSON string
    formData.append('userRequest', JSON.stringify(userRequest));
    formData.append('profileImage', profileImage);

    const url = `http://3.109.218.138:8080/user`;
    console.log(url);

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    console.log(response, 'response');

    return response.data;
  } catch (error) {
    console.error('signupDatas error', error);
    throw error;
  }
}

// export async function ProfileImageUpload(userid: any, profileImage: string) {
//   try {
//     const url = `http://3.109.218.138:8080/user/update/profileImage?id=${userid}
// `;
//     console.log(url);
//     const response = await axios.post(
//       url,
//       {profileImage},
//       {withCredentials: true},
//     );
//     return response.data;
//   } catch (error) {
//     console.error('dgetOTPVedrificationCode Error:', error);
//     throw error;
//   }
// }
export async function CheckPhoneNumbers(phoneNumbers: any) {
  try {
    const url = `http://3.109.218.138:8080/user/checkPhoneNumbers`;
    console.log(url);
    const response = await axios.post(
      url,
      {phoneNumbers},
      {withCredentials: true},
    );
    return response.data;
  } catch (error) {
    console.error('getOTPVerificationCode Error:', error);
    throw error;
  }
}

// export async function CheckPhoneNumbers(phoneNumbers: any) {
//   try {
//     const baseUrl = "http://3.109.218.138:8080/user/checkPhoneNumbers";
//     const urlWithNumbers = baseUrl + '?' + phoneNumbers.map((number: any) => `phoneNumbers=${number}`).join('&');
//     console.log('urlWithNumbersurlWithNumbers',urlWithNumbers);

//     const response = await axios.post(urlWithNumbers, { withCredentials: true });
//     return response.data.profileImage; // Assuming profileImage is a property within the response data
//   } catch (error) {
//     console.error('GetUserProfileImage Error:', error);
//     throw error;
//   }
// }

export async function NewChat(
  userProfileId: any,
  userProfileUrl: any,
  receiverProfileId: any,
  receiverProfileUrl: any,
  chatType: any,
  userTab: any,
) {
  try {
    const url = `http://3.109.218.138:8088/chat/new-chat`;
    console.log(url);
    const response = await axios.post(
      url,
      {
        userProfileId,
        userProfileUrl,
        receiverProfileId,
        receiverProfileUrl,
        chatType,
        userTab,
      },
      {withCredentials: true},
    );
    return response.data;
  } catch (error) {
    console.error('getOTPVerificationCode Error:', error);
    throw error;
  }
}

export async function GetUserDetails(name: any, phoneNumber: any) {
  try {
    const url = `http://3.109.218.138:8080/user/checkPhoneNumbers`;
    console.log(url);
    const response = await axios.post(
      url,
      {name, phoneNumber},
      {withCredentials: true},
    );
    return response.data;
  } catch (error) {
    console.error('getOTPVerificationCode Error:', error);
    throw error;
  }
}
