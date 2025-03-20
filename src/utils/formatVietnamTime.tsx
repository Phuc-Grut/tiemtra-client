const formatVietnamTime = (utcTimeStr: string) => {
    const utcDate = new Date(utcTimeStr);
    const vietnamOffset = 7 * 60 * 60 * 1000
    const vietnamDate = new Date(utcDate.getTime() + vietnamOffset)
  
    return vietnamDate.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  }
  
export default formatVietnamTime