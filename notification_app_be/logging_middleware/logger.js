function log(level, message) {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] [${level}] ${message}`);
}

module.exports = {
  info: (message) => log("INFO", message),
  warn: (message) => log("WARN", message),
  error: (message) => log("ERROR", message)
};