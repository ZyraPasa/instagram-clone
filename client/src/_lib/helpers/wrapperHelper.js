export const returnedWrapperHelper = (style) => {
  if (!style) return;
  let returnedStyleString = "";
  let styleKeys = Object.keys(style);
  let styleValue = Object.values(style);

  styleKeys.forEach((key, index) => {
    returnedStyleString += `${key}: ${styleValue[index]};`;
  });

  return returnedStyleString.trim();
};
