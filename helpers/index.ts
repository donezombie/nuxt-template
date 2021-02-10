export const handleErrorValidate = (
  internalErrors: any,
  callback: () => void
) => (errorCaught: any) => {
  callback && callback();
  errorCaught.inner.forEach((el: any) => {
    internalErrors[el.path] = el.message;
  });
};
