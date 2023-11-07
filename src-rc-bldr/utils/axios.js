import Axios from 'axios';
import {Config} from 'react-native-config';

export const unAuthenticatedInstance = () => {
  return Axios.create({
    baseURL: Config.API_URL,
  });
}

export const authenticatedInstance = ({headersProps, params}) => {
  const headers = {
    ...headersProps,
  };
  const axios = Axios.create({
    baseURL: Config.API_URL,
    headers: headers,
    params,
  });
  return axios;
}

export const callPostAPI = ({
  route,
  body,
  isAuthenticated = true,
  headersProps = {},
  params,
}) => {
  if (isAuthenticated) {
    const requestInstance = authenticatedInstance({headersProps, params});
    return requestInstance.post(route, body);
  }
  const requestInstance = unAuthenticatedInstance();
  return requestInstance.post(route, body);
}

export const callGetAPI = ({route, params, isAuthenticated = true}) => {
  if (isAuthenticated) {
    const requestInstance = authenticatedInstance({params});
    return requestInstance.get(route);
  }
  const requestInstance = unAuthenticatedInstance();
  return requestInstance.get(route);
}
