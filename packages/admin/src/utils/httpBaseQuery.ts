import http from './http';

const httpBaseQuery = () => {
  return async data => {
    try {
      const response = await http(data);
      return { data: response.data };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(String(error));
      // return {
      //   error: {
      //     status: error.status,
      //     data: error.data,
      //     message: error.message,
      //   },
      // };
    }
  };
};

export default httpBaseQuery;
