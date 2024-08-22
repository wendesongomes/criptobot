import { formatDistanceToNow, fromUnixTime } from "date-fns";

export function formatTimestamp(timestamp: number) {
  const date = fromUnixTime(timestamp / 1000);
  const distance = formatDistanceToNow(date, { addSuffix: true });

  return distance.replace("about", "").trim();
}
