const formatVietnamTime = (input: string | Date) => {
  const date = new Date(input);
  if (isNaN(date.getTime())) return "-";

  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  });
};

export default formatVietnamTime;
