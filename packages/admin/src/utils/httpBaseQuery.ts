import http from './http';

const httpBaseQuery = () => {
  return async data => {
    try {
      const response = await http(data);
      return { data: response.data };
    } catch (error) {
      throw new Error(error);
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
