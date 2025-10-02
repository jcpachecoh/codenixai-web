# Slack Integration Setup Guide

This guide will help you set up Slack notifications for new leads from your contact form.

## 1. Create a Slack Webhook

### Option A: Using Slack Workflows (Recommended - Easier)

1. Open Slack and go to the channel where you want to receive notifications
2. Click the channel name → **Integrations** → **Add Workflow**
3. Choose **From a webhook** → **Add Webhook**
4. Copy the webhook URL that's generated
5. Click **Done**

### Option B: Using Slack Apps (More Customizable)

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App** → **From scratch**
3. Name your app (e.g., "CodenixAI Leads") and select your workspace
4. In the app settings, go to **Incoming Webhooks**
5. Turn on **Activate Incoming Webhooks**
6. Click **Add New Webhook to Workspace**
7. Choose the channel where you want notifications
8. Copy the webhook URL

## 2. Add Webhook to Environment Variables

Update your `.env.local` file:

```env
# Slack Integration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**Important:** Never commit the actual webhook URL to your repository!

## 3. Test the Integration

1. Restart your development server: `npm run dev`
2. Go to your contact form: `http://localhost:3000/en/contact`
3. Submit a test lead
4. Check your Slack channel for the notification

## 4. Notification Features

The Slack notifications include:

### 📋 Lead Information

- Name and email (always included)
- Phone and company (if provided)
- Message content
- Submission timestamp

### 🎯 Marketing Attribution

- Source tracking (contact_form, etc.)
- Language/locale
- UTM parameters (source, medium, campaign)

### 🔗 Quick Actions

- **Reply to Lead**: Opens email client with pre-filled reply
- **View All Leads**: Links to your admin dashboard

### 💡 Rich Formatting

- Emojis and structured blocks for easy reading
- Color-coded sections
- Clickable buttons for actions

## 5. Customization Options

### Change Bot Name and Icon

Edit `src/services/slackService.ts`:

```typescript
body: JSON.stringify({
  blocks: blocks as any,
  username: 'Your Company Bot',  // Change this
  icon_emoji: ':star:'           // Change this
}),
```

### Modify Message Template

In `src/services/slackService.ts`, you can:

- Add more fields to the notification
- Change the message structure
- Add conditional logic for different lead types
- Include additional buttons or links

### Add More Channels

You can create multiple webhooks for different channels:

```env
SLACK_WEBHOOK_URL_SALES=https://hooks.slack.com/services/...
SLACK_WEBHOOK_URL_MARKETING=https://hooks.slack.com/services/...
```

Then modify the service to send to multiple channels based on lead source or other criteria.

## 6. Production Setup

### Environment Variables

In your production environment (Vercel, Netlify, etc.):

1. Add `SLACK_WEBHOOK_URL` as an environment variable
2. Make sure it's marked as "secret" or "encrypted"
3. Don't include it in your public repository

### Error Handling

The integration is designed to be non-blocking:

- If Slack is down, leads still get saved to your database
- Errors are logged but don't affect the user experience
- Failed notifications can be retried manually if needed

## 7. Troubleshooting

### Common Issues:

1. **No notifications received**

   - Check that `SLACK_WEBHOOK_URL` is set correctly
   - Verify the webhook URL is valid in Slack
   - Check server logs for error messages

2. **"invalid_payload" error**

   - Usually means the webhook URL is incorrect
   - Regenerate the webhook in Slack

3. **"channel_not_found" error**

   - The webhook was created for a channel that no longer exists
   - Create a new webhook for an existing channel

4. **Notifications work locally but not in production**
   - Environment variable not set in production
   - Check your deployment platform's environment settings

### Debug Mode:

To see detailed logs, check your server console when submitting leads. Look for:

- "Slack notification sent successfully" (success)
- "Slack webhook not configured" (webhook URL missing)
- "Slack webhook error:" (API errors)

## 8. Alternative Integrations

If you prefer other platforms, you can easily adapt the service:

- **Discord**: Change the webhook format
- **Microsoft Teams**: Use Teams webhook format
- **Email**: Use services like SendGrid or Nodemailer
- **Custom API**: Send to your own endpoint

---

🎉 **Your Slack integration is ready!** You'll now get instant notifications whenever someone submits a lead through your contact form.
