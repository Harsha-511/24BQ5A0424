const fetchNotifications =
  require("./notificationService");

const rankNotifications =
  require("./rankingService");

const logger =
  require("./logging_middleware/logger");

let unreadNotifications = [];

async function processNotifications() {
  try {
    logger.info(
      "Fetching notifications from API..."
    );

    const data =
      await fetchNotifications();

    if (!data) {
      logger.error(
        "No response received from API"
      );
      return;
    }

    if (data.message) {
      logger.error(data.message);
      return;
    }

    const latest =
      data.notifications ||
      data.data ||
      [];

    logger.info(
      `Received ${latest.length} notifications`
    );

    if (!Array.isArray(latest)) {
      logger.error(
        "Notifications response is not an array"
      );
      return;
    }

    unreadNotifications = [
      ...unreadNotifications,
      ...latest
    ];

    const uniqueMap = new Map();

    unreadNotifications.forEach(
      (notification) => {
        uniqueMap.set(
          notification.ID ||
          notification.id,
          notification
        );
      }
    );

    unreadNotifications =
      Array.from(uniqueMap.values());

    const top10 =
      rankNotifications(
        unreadNotifications,
        10
      );

    logger.info(
      `Top ${top10.length} notifications generated`
    );

    console.log(
      "\n========== TOP NOTIFICATIONS ==========\n"
    );

    console.table(
      top10.map((notification) => ({
        ID:
          notification.ID ||
          notification.id,

        Type:
          notification.Type ||
          notification.type,

        Message:
          notification.Message ||
          notification.message,

        Timestamp:
          notification.Timestamp ||
          notification.timestamp
      }))
    );

  } catch (error) {
    logger.error(error.message);
    console.error(error);
  }
}

processNotifications();

setInterval(
  processNotifications,
  30000
);