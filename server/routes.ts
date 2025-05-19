import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required' 
        });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid email format' 
        });
      }
      
      // In a real implementation, you might:
      // 1. Store the contact message in a database
      // 2. Send an email notification
      // For now, we'll just return success
      
      // Store contact message
      const contactMessage = await storage.createContactMessage({
        name,
        email,
        subject,
        message,
        createdAt: new Date()
      });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received successfully. We will get back to you soon.',
        data: { id: contactMessage.id }
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.' 
      });
    }
  });

  // Get projects endpoint
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch projects. Please try again later.' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
