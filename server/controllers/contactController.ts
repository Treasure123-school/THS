import { Request, Response } from "express";
import { storage } from "../storage";
import { contactFormSchema } from "../shared/schema";

export const contactController = {
  async submitMessage(req: Request, res: Response) {
    try {
      const { name, email, message } = req.body;

      // Validate input using Zod schema
      const validation = contactFormSchema.safeParse({ name, email, message });
      
      if (!validation.success) {
        const errors = validation.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }));
        
        return res.status(400).json({
          error: "Validation failed",
          message: "Please check the following fields:",
          details: errors
        });
      }

      const contactData = validation.data;

      // Save the contact message
      await storage.saveContactMessage(contactData);

      // In a real application, you might also:
      // - Send an email to administrators
      // - Send a confirmation email to the user
      // - Create a ticket in a support system
      // - Log the message to a database

      console.log("Contact form submission:", {
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
        timestamp: new Date().toISOString(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.status(201).json({
        message: "Thank you for your message! We'll get back to you within 24 hours.",
        submittedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(500).json({
        error: "Failed to submit message",
        message: "We're sorry, but there was an error processing your message. Please try again later or contact us directly."
      });
    }
  },

  // Admin endpoint to retrieve contact messages (future implementation)
  async getMessages(req: Request, res: Response) {
    try {
      // TODO: Implement contact message retrieval for admin dashboard
      // This would require adding contact message storage to the storage interface
      
      res.status(501).json({
        error: "Not implemented",
        message: "Contact message retrieval will be implemented in a future update"
      });
    } catch (error) {
      console.error("Get contact messages error:", error);
      res.status(500).json({
        error: "Failed to retrieve messages",
        message: "Internal server error"
      });
    }
  },

  // Admin endpoint to mark message as read/responded (future implementation)
  async updateMessageStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // TODO: Implement message status updates
      // Statuses could be: 'new', 'read', 'responded', 'closed'
      
      res.status(501).json({
        error: "Not implemented",
        message: "Contact message status updates will be implemented in a future update"
      });
    } catch (error) {
      console.error("Update message status error:", error);
      res.status(500).json({
        error: "Failed to update message status",
        message: "Internal server error"
      });
    }
  }
};
