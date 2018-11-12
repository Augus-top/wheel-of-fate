export const getUser = async (userInfo) => {
  try {
    const apiPath = !isNaN(parseInt(userInfo, 10)) 
                    ? '/user/id/'
                    : '/user/name/';
    const response = await fetch(apiPath + userInfo)
    if (response.status === 404) {
      return 'error';
    }
    const responseJSON = await response.json();
    return responseJSON[0];
  } catch (err) { 
    console.log(err);
    return 'error';
  }
};
