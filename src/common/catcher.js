function catcher(originalFunction, errorHandler) {
  return (req, res, next) => {
    function handleError(err) {
      if (typeof errorHandler === 'function') {
        return errorHandler(req, res, next);
      }
      return next(err);
    }

    try {
      const originalReturn = originalFunction(req, res, next);
      if (originalReturn && typeof originalReturn.catch === 'function') {
        originalReturn.catch(handleError);
      }
    } catch (e) {
      handleError(e);
    }
  };
}

module.exports = {
  catcher
};
