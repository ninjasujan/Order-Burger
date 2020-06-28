export const updateObject = (state, updatedObject) => {
  return {
    ...state,
    ...updatedObject,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (isValid && rules.required) {
    isValid = value.trim() !== "";
  }
  if (isValid && rules.minLength) {
    isValid = rules.minLength <= value.trim().length;
  }
  if (isValid && rules.maxLength) {
    isValid = value.trim().length <= rules.minLength;
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
