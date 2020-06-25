export const updateObject = (state, updatedObject) => {
  return {
    ...state,
    ...updatedObject,
  };
};
