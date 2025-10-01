/**
 * Slack notification service for new leads
 */

export interface SlackNotificationData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  locale?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export class SlackService {
  private static webhookUrl = process.env.SLACK_WEBHOOK_URL;

  /**
   * Send a notification to Slack when a new lead is created
   */
  static async sendNewLeadNotification(leadData: SlackNotificationData): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.webhookUrl || this.webhookUrl === 'your_slack_webhook_url_here') {
        console.log('Slack webhook not configured, skipping notification');
        return { success: false, error: 'Slack webhook not configured' };
      }

      // Create a simple text-based message for better compatibility
      let message = `🎯 *New Lead Received!*\n\n`;
      message += `*Name:* ${leadData.name}\n`;
      message += `*Email:* ${leadData.email}\n`;
      
      if (leadData.phone) {
        message += `*Phone:* ${leadData.phone}\n`;
      }
      if (leadData.company) {
        message += `*Company:* ${leadData.company}\n`;
      }
      
      message += `*Message:* ${leadData.message}\n\n`;
      
      if (leadData.source) {
        message += `*Source:* ${leadData.source}\n`;
      }
      if (leadData.locale) {
        message += `*Language:* ${leadData.locale.toUpperCase()}\n`;
      }
      
      // Add UTM tracking if available
      if (leadData.utmSource || leadData.utmMedium || leadData.utmCampaign) {
        const utmInfo = [];
        if (leadData.utmSource) utmInfo.push(`Source: ${leadData.utmSource}`);
        if (leadData.utmMedium) utmInfo.push(`Medium: ${leadData.utmMedium}`);
        if (leadData.utmCampaign) utmInfo.push(`Campaign: ${leadData.utmCampaign}`);
        message += `*UTM Tracking:* ${utmInfo.join(' | ')}\n`;
      }
      
      message += `\n📅 Received at ${new Date().toLocaleString()}`;
      message += `\n📧 Reply: <mailto:${leadData.email}|${leadData.email}>`;

      // Send to Slack using simple text format
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          username: 'CodenixAI Bot',
          icon_emoji: ':robot_face:'
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Slack webhook error:', errorText);
        return { success: false, error: `Slack API error: ${response.status}` };
      }

      console.log('Slack notification sent successfully');
      return { success: true };

    } catch (error: unknown) {
      console.error('Error sending Slack notification:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Send a simple text notification (fallback)
   */
  static async sendSimpleNotification(text: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.webhookUrl || this.webhookUrl === 'your_slack_webhook_url_here') {
        console.log('Slack webhook not configured, skipping notification');
        return { success: false, error: 'Slack webhook not configured' };
      }

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          username: 'CodenixAI Bot',
          icon_emoji: ':robot_face:'
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Slack webhook error:', errorText);
        return { success: false, error: `Slack API error: ${response.status}` };
      }

      return { success: true };

    } catch (error: unknown) {
      console.error('Error sending Slack notification:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }
}