import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatVietnamTime = (input: string | Date) => {
  const date = dayjs(input);
  if (!date.isValid()) return "-";

  return date.tz("Asia/Ho_Chi_Minh").format("HH:mm DD/MM/YYYY");
};

export default formatVietnamTime;
