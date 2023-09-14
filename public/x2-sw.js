self.addEventListener("install", e => {
  console.log(e.type)
  self.skipWaiting() // always activate updated SW immediately please
})

self.addEventListener("push", function (event) {
  if (event.data) {
    console.log("Push event!! ", event.data.text())
    const json = JSON.parse(event.data.text())
    event.waitUntil(
      self.registration.showNotification(json.title, json.options)
    )
  } else {
    console.log("Push event but no data")
  }
})

self.addEventListener("notificationclick", function (event) {
  event.notification.close() // Close the notification

  // Get the URL from the data object
  const urlToOpen = event.notification.data.url

  // Open the URL in a new window/tab
  event.waitUntil(clients.openWindow(urlToOpen))
})
