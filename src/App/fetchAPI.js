const fetchAPI = {
  postData: async (url = "", data) => {
    console.log(data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(data),
    });
    return fetchAPI.getResponse(response);
  },
  getData: async (url = "", token) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    return fetchAPI.getResponse(response);
  },
  getResponse: async (response) => {
    try {
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw new Error(
          JSON.stringify({ status: response.status, error: data })
        );
      }
      if (data.token) {
        return data;
      } else return { success: true, status: response.status, data: data };
    } catch (error) {
      const errorInfo = JSON.parse(error.message);

      return {
        success: false,
        status: errorInfo.status || null,
        data: errorInfo.data || errorInfo,
      };
    }
  },
};
export default fetchAPI;
