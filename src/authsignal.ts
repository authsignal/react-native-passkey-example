import {Authsignal} from 'react-native-authsignal';

const tenantID = 'YOUR_TENANT_ID';
const baseURL = 'https://au-challenge.authsignal.com/v1'; // CHANGE FOR YOUR REGION

export const authsignal = new Authsignal({tenantID, baseURL});
