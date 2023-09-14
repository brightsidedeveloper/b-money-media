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
  event.waitUntil(clients.openWindow())

  // Open the PWA
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientsList => {
      for (const client of clientsList) {
        if ("navigate" in client) {
          return client.navigate(urlToOpen) // Replace with the appropriate URL for your PWA
        }
      }
      // If no open window is found, open the PWA in a new window
      return clients.openWindow(urlToOpen) // Replace with the appropriate URL for your PWA
    })
  )
})
