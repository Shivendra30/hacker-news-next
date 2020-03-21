export default timestamp => {
  const date = new Date(timestamp * 1000);
  const currDate = new Date();
  const res = Math.abs(date - currDate) / 1000;

  const days = parseInt(Math.floor(res / 86400));

  const hours = parseInt(Math.floor(res / 3600) % 24);

  const minutes = parseInt(Math.floor(res / 60) % 60);

  const seconds = parseInt(res % 60);

  if (days > 0) return `${days} days ago`;
  else if (days === 0 && hours > 0) return `${hours} hours ago`;
  else if (hours === 0 && minutes > 0) return `${minutes} minutes ago`;
  else if (hours === 0 && minutes === 0 && seconds > 0)
    return `${seconds} seconds ago`;
};
