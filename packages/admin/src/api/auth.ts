import http from '@/utils/http';

interface LoginParams {
  username: string;
  password: string;
  code: string;
}

interface LoginResponse {
  token: string;
  code: number;
}

interface CaptchaResponse {
  code: number;
  img: string;
}

interface UserInfoResponse<T> {
  code: number;
  data: T;
}

interface RoutersResponse<T> {
  code: number;
  data: T;
}
export const loginApi = (data: LoginParams) => http.post<LoginResponse>('/login', data);
export const getCaptchaApi = () => http.get<CaptchaResponse>('/captchaImage');

export const getUserInfoApi = () => http.get<UserInfoResponse<T>>('/system/getInfo');

export const getRoutersApi = () => http.get<RoutersResponse<T>>('/menu');
