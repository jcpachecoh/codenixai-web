# Supabase Lead Management Setup Guide

This guide will help you set up Supabase to manage leads from your contact form.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization and set up:
   - **Project Name**: `codenixai-leads` (or any name you prefer)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
4. Wait for the project to be created (usually takes 2-3 minutes)

## 2. Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Project API Keys**:
     - `anon` `public` key (for client-side operations)
     - `service_role` `secret` key (for server-side operations)

## 3. Set Up Environment Variables

o\*a4H!$HF7MioovJ

1. Create a `.env.local` file in your project root:

```bash
cp .env.local.example .env.local
```

2. Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key_here
```

## 4. Create the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the content from `database/schema.sql` and run it
3. This will create:
   - `leads` table with all necessary fields
   - Indexes for performance
   - Row Level Security (RLS) policies
   - Triggers for automatic timestamp updates
   - Analytics view for reporting

## 5. Test Your Setup

1. Start your development server:

```bash
npm run dev
```

2. Go to your contact page: `http://localhost:3000/en/contact`
3. Fill out and submit the contact form
4. Check your Supabase dashboard → **Table Editor** → `leads` to see the new entry!

## 6. Features Included

### Lead Capture

- ✅ **Name & Email** (required)
- ✅ **Phone & Company** (optional)
- ✅ **Message** (required)
- ✅ **Auto-capture**: Locale, UTM parameters, source tracking
- ✅ **Validation**: Server-side validation with detailed error messages

### Lead Management

- ✅ **Status Tracking**: new → contacted → qualified → converted → closed
- ✅ **Timestamps**: Auto-updated created_at and updated_at
- ✅ **Analytics**: Built-in analytics view for reporting
- ✅ **Duplicate Detection**: Email existence checking

### Security

- ✅ **Row Level Security** enabled
- ✅ **API Validation** with Zod schemas
- ✅ **Environment Variables** for secure credentials
- ✅ **Anonymous Insert** allowed for contact forms

## 7. API Endpoints

### Create a Lead

```bash
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "message": "I'm interested in your services",
  "locale": "en"
}
```

### Get Leads (for admin)

```bash
GET /api/leads?limit=50&offset=0
```

## 8. Next Steps (Optional Enhancements)

### Admin Dashboard

- Create an admin page to view and manage leads
- Add authentication for admin access
- Build lead status update functionality

### Email Notifications

- Set up email notifications when new leads arrive
- Use Supabase Edge Functions or Resend/SendGrid integration

### Lead Scoring

- Add lead scoring based on form data
- Implement automatic lead qualification

### Analytics

- Use the `lead_analytics` view for reporting
- Create charts and dashboards

### CRM Integration

- Connect to HubSpot, Salesforce, or other CRMs
- Automate lead sync processes

## 9. Monitoring & Maintenance

### Check Lead Activity

```sql
-- View recent leads
SELECT * FROM leads
ORDER BY created_at DESC
LIMIT 10;

-- Lead analytics by day
SELECT * FROM lead_analytics
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC;
```

### Update Lead Status

```sql
-- Mark lead as contacted
UPDATE leads
SET status = 'contacted'
WHERE id = 'lead-uuid-here';
```

## 10. Troubleshooting

### Common Issues:

1. **"Cannot find module '@supabase/supabase-js'"**: Run `npm install @supabase/supabase-js zod`
2. **"Missing Supabase environment variables"**: Check your `.env.local` file
3. **"new row violates row-level security policy"**: This is an RLS permission issue. Run the SQL commands in `database/fix-rls.sql` in your Supabase SQL Editor
4. **"Permission denied"**: Verify your RLS policies in Supabase
5. **"Network error"**: Check your Supabase project URL and API keys

### RLS Permission Fix:

If you get RLS policy violations, run this in your Supabase SQL Editor:

```sql
-- Run the content from database/fix-rls.sql
-- This will fix permission issues with anonymous users
```

### Debug Mode:

Add console logging to see API responses:

```javascript
console.log('Lead submission result:', result);
```

---

🎉 **Your lead management system is now ready!** Users can submit leads through your contact form, and they'll be automatically saved to your Supabase database with full tracking and analytics.

## 11. Slack Notifications (Optional)

To get instant Slack notifications when new leads are submitted, check out the [SLACK_SETUP.md](SLACK_SETUP.md) guide.
