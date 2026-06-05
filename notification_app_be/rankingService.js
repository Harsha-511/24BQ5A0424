const weights = {
  Result: 3,
  Placement: 2,
  Event: 1
};

function rankNotifications(notifications, topN = 10) {
  return notifications
    .map((notification) => ({
      ...notification,
      score:
        (weights[
          notification.Type ||
          notification.type
        ] || 0) * 1000000000000 +
        new Date(
          notification.Timestamp ||
          notification.timestamp
        ).getTime()
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

module.exports = rankNotifications;