function responseHandler(responseInfo) {
  let response = { success: responseInfo.success };
  if (responseInfo.error) {
    response.error = responseInfo.error;
  }
  if (responseInfo.data !== undefined) {
    response.data = responseInfo.data;
  }

  return responseInfo.res.status(responseInfo.statusCode).json(response);
}

module.exports = {
  standardServiceResponse: function(res, next, data) {
    return data
      .then(result => {
        let responseInfo = {
          res: res,
          data: result,
          statusCode: 200,
          success: true
        };
        return responseHandler(responseInfo);
      })
      .catch(err => {
        next(
          new Error(
            JSON.stringify({ statusCode: 500, message: `${err.message}` })
          )
        );
      });
  }
};
