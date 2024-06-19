import { formatRelative, format } from "date-fns";

export function Datetime(dateIn) {
  let date = new Date(dateIn);
  return formatRelative(date, new Date());
}

export default function DateLocalFormat(dateIn) {
  return "the " + format(new Date(dateIn), "d MMMM y, h:mm");
}
