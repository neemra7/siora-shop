import webpush from "npm:web-push";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;
const webhookSecret = Deno.env.get("WEBHOOK_SECRET")!;

webpush.setVapidDetails(
  "mailto:admin@sioraart.shop",
  vapidPublicKey,
  vapidPrivateKey
);

Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (request.headers.get("x-webhook-secret") !== webhookSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = await request.json();
  const order = payload.record || payload;
  const response = await fetch(`${supabaseUrl}/rest/v1/push_subscriptions?select=subscription`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });
  const { data: subscriptions } = await response.json();

  await Promise.all((subscriptions || []).map(async ({ subscription }: { subscription: webpush.PushSubscription }) => {
    try {
      await webpush.sendNotification(subscription, JSON.stringify({
        title: "طلب جديد من سيورا آرت",
        body: `${order.customer_name || "عميل جديد"} - ${Number(order.total || 0).toFixed(2)} د.أ`,
        url: "/admin/",
      }));
    } catch (error) {
      console.error("Push notification failed:", error);
    }
  }));

  return Response.json({ sent: subscriptions?.length || 0 });
});