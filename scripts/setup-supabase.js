#!/usr/bin/env node

/**
 * Supabase Setup and Diagnostics Script
 * Run this script to check your Supabase configuration and setup
 */

console.log("🚀 CodeNix AI - Supabase Lead System Setup\n");

// Check environment variables
console.log("📋 Checking Environment Variables:");
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
  'SUPABASE_SERVICE_ROLE_KEY'
];

let allConfigured = true;
requiredVars.forEach(varName => {
  const isSet = !!process.env[varName];
  console.log(`   ${varName}: ${isSet ? '✅' : '❌'} ${isSet ? 'Configured' : 'Missing'}`);
  if (!isSet) allConfigured = false;
});

console.log("\n🗄️  Database Schema Required:");
console.log("   The following schema needs to be applied to your Supabase database:");
console.log("   📁 File: database/leads-schema.sql");
console.log("   🔧 Apply via: Supabase Dashboard > SQL Editor > Run the script");

console.log("\n🎯 Features Implemented:");
console.log("   ✅ Complete CRUD operations for leads");
console.log("   ✅ Type-safe TypeScript interfaces");
console.log("   ✅ Row Level Security (RLS) policies");
console.log("   ✅ UTM and source tracking");
console.log("   ✅ Lead status management");
console.log("   ✅ Pagination and filtering");
console.log("   ✅ Statistics and analytics");
console.log("   ✅ Bulk operations support");

console.log("\n📡 API Endpoints Available:");
console.log("   POST /api/leads - Create new lead");
console.log("   GET  /api/leads - Get leads with pagination");
console.log("   PUT  /api/leads/[id] - Update lead (not implemented yet)");
console.log("   DELETE /api/leads/[id] - Delete lead (not implemented yet)");

console.log("\n🔧 Setup Instructions:");
if (!allConfigured) {
  console.log("   1. 🌐 Go to https://app.supabase.com");
  console.log("   2. 📝 Create a new project or select existing");
  console.log("   3. ⚙️  Go to Settings > API");
  console.log("   4. 📋 Copy the following values to your .env.local:");
  console.log("      - Project URL → NEXT_PUBLIC_SUPABASE_URL");
  console.log("      - anon public key → NEXT_PUBLIC_SUPABASE_ANON_KEY");
  console.log("      - service_role key → SUPABASE_SERVICE_ROLE_KEY");
  console.log("   5. 🗄️  Apply database schema (database/leads-schema.sql)");
  console.log("   6. 🔄 Restart your development server");
} else {
  console.log("   ✅ Environment variables are configured!");
  console.log("   📝 Make sure to apply the database schema");
  console.log("   🧪 Test the contact form on your website");
}

console.log("\n🧪 Testing:");
console.log("   1. Fill out the WhatsApp automation contact form");
console.log("   2. Check browser console for debug logs");
console.log("   3. Verify lead appears in Supabase dashboard");
console.log("   4. Test GET /api/leads in browser or Postman");

console.log("\n📊 Service Methods Available:");
console.log("   LeadService.createLead(data)");
console.log("   LeadService.getLeads(options)");
console.log("   LeadService.getLeadById(id)");
console.log("   LeadService.updateLead(id, data)");
console.log("   LeadService.deleteLead(id)");
console.log("   LeadService.updateLeadStatus(id, status)");
console.log("   LeadService.getLeadStats()");
console.log("   LeadService.emailExists(email)");
console.log("   LeadService.bulkUpdateLeads(ids, data)");

if (allConfigured) {
  console.log("\n🎉 Your Supabase Lead System is ready to use!");
} else {
  console.log("\n⚠️  Please complete the setup steps above.");
}

console.log("\n💡 Pro Tips:");
console.log("   - Enable email notifications in Supabase for new leads");
console.log("   - Set up Slack integration for real-time notifications");
console.log("   - Use the lead_stats view for dashboard analytics");
console.log("   - Consider adding user authentication for admin features");

console.log("\n🆘 Need Help?");
console.log("   - Supabase Docs: https://supabase.com/docs");
console.log("   - Next.js Integration: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs");

// Test API connection if environment is configured
if (allConfigured && typeof fetch !== 'undefined') {
  console.log("\n🔍 Testing API connection...");
  testAPIConnection();
}

async function testAPIConnection() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/leads`, {
      method: 'GET',
    });
    
    console.log(`   API Status: ${response.status}`);
    if (response.ok) {
      console.log("   ✅ API is responding correctly");
    } else {
      console.log("   ❌ API returned an error");
    }
  } catch (error) {
    console.log("   ⚠️  Could not test API (server may not be running)");
  }
}