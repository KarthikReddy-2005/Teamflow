import ApiError from "./ApiError.js";

const checkDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new ApiError(400, "Invalid startDate or endDate");
  }

  if (start >= end) {
    throw new ApiError(400, "startDate should be smaller than endDate");
  }

  return true;
};

export default checkDates;
