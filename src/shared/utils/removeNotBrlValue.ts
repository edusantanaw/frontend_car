export function removeNotBrlValue(value: string) {
  let isFirst = true;
  return value
    .split("")
    .filter((e) => {
      if (e === "," && isFirst) {
        isFirst = false;
        return true;
      }
      return !isNaN(Number(e));
    })
    .join("");
}
