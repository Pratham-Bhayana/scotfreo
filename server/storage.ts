import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contactMessages: Map<number, ContactMessage>;
  private userCurrentId: number;
  private projectCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactMessages = new Map();
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
    this.contactMessageCurrentId = 1;
    
    // Initialize with sample projects
    this.initializeProjects();
  }
  
  private initializeProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "Gold Standard",
        type: "Luxury Advertisement",
        description: "An elegant advertisement showcasing premium products with cinematic flair and artistic direction.",
        thumbnailUrl: "https://pixabay.com/get/g43e7ceea15389fe00a8ef158862142d6a284542504a5cfa9b56d5921fbaf9f497202f92fa4040c443bdf503ae0e44e3a79313b65ce36ab4dec92951552f07fdb_1280.jpg",
        videoUrl: "https://player.vimeo.com/video/556579479"
      },
      {
        title: "Shadows & Light",
        type: "Short Film",
        description: "A character-driven narrative exploring themes of duality through expert cinematography.",
        thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&h=400&q=80",
        videoUrl: "https://player.vimeo.com/video/449735432"
      },
      {
        title: "Retro Revival",
        type: "Automotive Commercial",
        description: "A nostalgic journey capturing the timeless essence of automotive excellence.",
        thumbnailUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&h=400&q=80",
        videoUrl: "https://player.vimeo.com/video/325545609"
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
  
  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
