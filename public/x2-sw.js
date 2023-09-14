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
