# Supabase push notifications

## One-time setup

1. Run `schema.sql` in the Supabase SQL Editor.
2. Generate VAPID keys locally:

   ```sh
   npx web-push generate-vapid-keys
   ```

3. In Supabase, deploy the function:

   ```sh
   supabase functions deploy notify-new-order --no-verify-jwt
   ```

4. Set these function secrets in Supabase:

   - `VAPID_PUBLIC_KEY`: the generated public key
   - `VAPID_PRIVATE_KEY`: the generated private key
   - `WEBHOOK_SECRET`: a long random value

5. Add `PUBLIC_VAPID_PUBLIC_KEY` as a GitHub repository variable with the same public key, then redeploy the Pages workflow.
6. In Supabase, create a Database Webhook for `public.orders`, event `INSERT`, targeting:
   `https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-new-order`
7. Add the header `x-webhook-secret` with the same value used for `WEBHOOK_SECRET`.

After this, sign in at `/admin/`, select **Enable notifications**, and allow notifications on the phone. New orders will then notify every subscribed admin device.