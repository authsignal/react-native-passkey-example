import {Platform} from 'react-native';

const LOCALHOST = Platform.select({ios: '192.168.1.4', android: '10.0.2.2'});

const MOCK_SERVER = `http://${LOCALHOST}:3030`;

export const post = (path: string, body: any) =>
  fetch(`${MOCK_SERVER}${path}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }).then(res => res.json());
