import dayjs from "dayjs";

export const formatDate = (date: Date) => dayjs(date).format("hh:mm A, DD MMMM YYYY");
