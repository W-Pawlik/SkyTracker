export function convertTimestamp(time: number | null | undefined) {
  if (!time) {
    return "not available";
  }
  const date = new Date(time * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };

  const formattedDate = date.toLocaleString("en-GB", options);

  return formattedDate;
}

export function getTimeSinceLastContact(lastContactTime: number | null | undefined) {
  if (!lastContactTime) {
    return "not available";
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - lastContactTime;

  if (timeDifference < 60) {
    return `${timeDifference} s ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else if (timeDifference < 86_400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(timeDifference / 86_400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
}
