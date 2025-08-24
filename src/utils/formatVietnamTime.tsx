import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const hasOffset = (s: string) => /[zZ]|[+\-]\d{2}:\d{2}$/.test(s);

const formatVietnamTime = (input: string | Date) => {
  const d =
    typeof input === "string" && !hasOffset(input)
      ? dayjs.utc(input) // coi chuỗi “trần” là UTC
      : dayjs(input); // đã có Z/offset hoặc là Date

  if (!d.isValid()) return "-";
  return d.tz("Asia/Ho_Chi_Minh").format("HH:mm DD/MM/YYYY");
};

export default formatVietnamTime;
