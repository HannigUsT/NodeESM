const isFieldInvalidOrEmpty = (value, type) => {
  return (
    // eslint-disable-next-line valid-typeof
    typeof value !== type ||
    (type === 'string' && value.length === 0) ||
    (type === 'number' && isNaN(value))
  );
};

export { isFieldInvalidOrEmpty };
