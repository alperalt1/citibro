export const AxiosException = (error: any): string => {
  if(error.hasOwnProperty('response') && error.response.hasOwnProperty('data')){
      if(error.response.data.hasOwnProperty('message')){
          return `${error.response.data.message}`
      } else {
          return `${error.response.data}`
      }
  } else {
      return error.message;
  }
}