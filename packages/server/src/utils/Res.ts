export interface ResData<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

export const success = <T>(data: T): ResData<T> => {
  return {
    code: 200,
    message: 'success',
    data,
    success: true,
  };
};

export const error = <T>(message: string): ResData<T> => {
  return {
    code: 500,
    message,
    data: undefined as unknown as T,
    success: false,
  };
};

export default ResData;
