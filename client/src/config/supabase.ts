// Note: This file is for future Supabase integration
// Currently using in-memory storage as per project requirements

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const supabaseConfig: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || "",
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ""
};

// TODO: Implement Supabase client when ready to migrate from in-memory storage
// export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

export const validateSupabaseConfig = (): boolean => {
  return !!(supabaseConfig.url && supabaseConfig.anonKey);
};

// Storage bucket configuration
export const STORAGE_BUCKETS = {
  gallery: "gallery",
  documents: "documents",
  profiles: "profiles"
} as const;

// Database table names
export const TABLES = {
  profiles: "profiles",
  announcements: "announcements",
  gallery: "gallery",
  questionBank: "question_bank",
  exams: "exams",
  examQuestions: "exam_questions",
  examAttempts: "exam_attempts",
  examAnswers: "exam_answers"
} as const;

// Row Level Security policies helper
export const RLS_POLICIES = {
  announcements: {
    read: "Users can read announcements based on their role",
    write: "Only admins and teachers can create/update announcements",
    delete: "Only admins can delete announcements"
  },
  gallery: {
    read: "Everyone can read gallery items",
    write: "Only admins and staff can upload to gallery",
    delete: "Only admins and staff can delete gallery items"
  },
  profiles: {
    read: "Users can read their own profile and admins can read all",
    write: "Users can update their own profile and admins can update all",
    delete: "Only admins can delete profiles"
  }
};
