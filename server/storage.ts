import { 
  type Profile, 
  type InsertProfile,
  type Announcement,
  type InsertAnnouncement,
  type GalleryItem,
  type InsertGalleryItem,
  type ContactForm
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<Profile | undefined>;
  getUserByEmail(email: string): Promise<Profile | undefined>;
  createUser(user: InsertProfile): Promise<Profile>;
  updateUser(id: string, user: Partial<InsertProfile>): Promise<Profile | undefined>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(): Promise<Profile[]>;

  // Announcements
  getAnnouncements(): Promise<Announcement[]>;
  getAnnouncementById(id: string): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: string, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: string): Promise<boolean>;

  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemById(id: string): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  deleteGalleryItem(id: string): Promise<boolean>;

  // Contact
  saveContactMessage(message: ContactForm): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, Profile>;
  private announcements: Map<string, Announcement>;
  private galleryItems: Map<string, GalleryItem>;
  private contactMessages: ContactForm[];

  constructor() {
    this.users = new Map();
    this.announcements = new Map();
    this.galleryItems = new Map();
    this.contactMessages = [];

    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create admin user
    const adminId = randomUUID();
    const admin: Profile = {
      id: adminId,
      email: "admin@treasurehomeschool.edu.ng",
      name: "Administrator",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(adminId, admin);

    // Create sample teacher
    const teacherId = randomUUID();
    const teacher: Profile = {
      id: teacherId,
      email: "teacher@treasurehomeschool.edu.ng",
      name: "John Adebayo",
      role: "teacher",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(teacherId, teacher);

    // Create sample student
    const studentId = randomUUID();
    const student: Profile = {
      id: studentId,
      email: "student@treasurehomeschool.edu.ng",
      name: "Chioma Nwankwo",
      role: "student",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(studentId, student);

    // Create sample parent
    const parentId = randomUUID();
    const parent: Profile = {
      id: parentId,
      email: "parent@treasurehomeschool.edu.ng",
      name: "Mrs. Adunni Oladapo",
      role: "parent",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(parentId, parent);

    // Create sample announcements
    const announcement1: Announcement = {
      id: randomUUID(),
      title: "End of Term Examination Schedule",
      content: "The final examinations for this term will commence on January 15th, 2024. Please ensure all students are well prepared and have reviewed their study materials. Exam timetables will be distributed to all classes by the end of this week.",
      audience: ["all"],
      createdBy: adminId,
      createdAt: new Date("2023-12-15"),
      updatedAt: new Date("2023-12-15"),
    };
    this.announcements.set(announcement1.id, announcement1);

    const announcement2: Announcement = {
      id: randomUUID(),
      title: "Parent-Teacher Conference",
      content: "We invite all parents to attend the upcoming parent-teacher conference scheduled for December 20th. This is an important opportunity to discuss your child's progress and development with their teachers.",
      audience: ["parents"],
      createdBy: adminId,
      createdAt: new Date("2023-12-12"),
      updatedAt: new Date("2023-12-12"),
    };
    this.announcements.set(announcement2.id, announcement2);

    const announcement3: Announcement = {
      id: randomUUID(),
      title: "Professional Development Workshop",
      content: "All teaching staff are required to attend the professional development workshop on modern teaching methodologies scheduled for December 18th in the main hall.",
      audience: ["staff"],
      createdBy: adminId,
      createdAt: new Date("2023-12-10"),
      updatedAt: new Date("2023-12-10"),
    };
    this.announcements.set(announcement3.id, announcement3);

    // Create sample gallery items
    const galleryItem1: GalleryItem = {
      id: randomUUID(),
      title: "Science Laboratory",
      description: "Students conducting experiments in our modern science laboratory",
      fileUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      uploadedBy: adminId,
      uploadedAt: new Date(),
    };
    this.galleryItems.set(galleryItem1.id, galleryItem1);

    const galleryItem2: GalleryItem = {
      id: randomUUID(),
      title: "Sports Field",
      description: "Students enjoying physical activities on our sports field",
      fileUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      uploadedBy: adminId,
      uploadedAt: new Date(),
    };
    this.galleryItems.set(galleryItem2.id, galleryItem2);

    const galleryItem3: GalleryItem = {
      id: randomUUID(),
      title: "Library",
      description: "Students studying in our modern library facility",
      fileUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      uploadedBy: adminId,
      uploadedAt: new Date(),
    };
    this.galleryItems.set(galleryItem3.id, galleryItem3);

    const galleryItem4: GalleryItem = {
      id: randomUUID(),
      title: "Art Class",
      description: "Students expressing creativity in our art classroom",
      fileUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      uploadedBy: adminId,
      uploadedAt: new Date(),
    };
    this.galleryItems.set(galleryItem4.id, galleryItem4);

    const galleryItem5: GalleryItem = {
      id: randomUUID(),
      title: "Cafeteria",
      description: "Students enjoying meals in our school cafeteria",
      fileUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      uploadedBy: adminId,
      uploadedAt: new Date(),
    };
    this.galleryItems.set(galleryItem5.id, galleryItem5);

    const galleryItem6: GalleryItem = {
      id: randomUUID(),
      title: "Graduation Ceremony",
      description: "Celebrating our students' achievements at graduation",
      fileUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      uploadedBy: adminId,
      uploadedAt: new Date(),
    };
    this.galleryItems.set(galleryItem6.id, galleryItem6);
  }

  // User management methods
  async getUser(id: string): Promise<Profile | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<Profile | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertProfile): Promise<Profile> {
    const id = randomUUID();
    const user: Profile = {
      ...insertUser,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updateData: Partial<InsertProfile>): Promise<Profile | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser: Profile = {
      ...user,
      ...updateData,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async getAllUsers(): Promise<Profile[]> {
    return Array.from(this.users.values());
  }

  // Announcement methods
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getAnnouncementById(id: string): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = randomUUID();
    const announcement: Announcement = {
      ...insertAnnouncement,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.announcements.set(id, announcement);
    return announcement;
  }

  async updateAnnouncement(id: string, updateData: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const announcement = this.announcements.get(id);
    if (!announcement) return undefined;

    const updatedAnnouncement: Announcement = {
      ...announcement,
      ...updateData,
      updatedAt: new Date(),
    };
    this.announcements.set(id, updatedAnnouncement);
    return updatedAnnouncement;
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    return this.announcements.delete(id);
  }

  // Gallery methods
  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).sort(
      (a, b) => b.uploadedAt!.getTime() - a.uploadedAt!.getTime()
    );
  }

  async getGalleryItemById(id: string): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = randomUUID();
    const item: GalleryItem = {
      ...insertItem,
      id,
      uploadedAt: new Date(),
    };
    this.galleryItems.set(id, item);
    return item;
  }

  async deleteGalleryItem(id: string): Promise<boolean> {
    return this.galleryItems.delete(id);
  }

  // Contact methods
  async saveContactMessage(message: ContactForm): Promise<void> {
    this.contactMessages.push(message);
    // In a real implementation, this would save to database or send email
    console.log("Contact message received:", message);
  }
}

export const storage = new MemStorage();
