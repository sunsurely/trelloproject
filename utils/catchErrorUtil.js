exports.catchError = (error, errorSide) => {
  if (error instanceof MakeError) {
    return res.status(error.code).json({ message: error.message });
  }
  console.error(errorSide, error);
  res.status(500).json({ message: 'Server Error' });
};
