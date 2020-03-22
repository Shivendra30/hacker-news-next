export default url =>
  url
    ? "(" +
      url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .split("/")[0]
        .trim() +
      ")"
    : "";
