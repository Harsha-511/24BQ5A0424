export const logEvent = (action, data = {}) => {
  console.log({
    timestamp: new Date().toISOString(),
    action,
    data,
  });
};