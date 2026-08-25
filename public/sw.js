self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || "Siora Art", {
      body: data.body || "لديك طلب جديد.",
      icon: "/images/siora logo.jpg",
      badge: "/images/siora logo.jpg",
      data: { url: data.url || "/admin/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || "/admin/"));
});