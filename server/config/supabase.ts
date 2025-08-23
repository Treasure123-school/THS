// Server-side Supabase configuration
// Currently using in-memory storage as per project requirements

export interface SupabaseServerConfig {
  url: string;
  serviceRoleKey: string;
  jwtSecret?: string;
}

export const supabaseServerConfig: SupabaseServerConfig = {
  url: process.env.SUPABASE_URL || "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  jwtSecret: process.env.SUPABASE_JWT_SECRET
};

// TODO: Implement Supabase admin client when ready to migrate
// export const supabaseAdmin = createClient(
//   supabaseServerConfig.url,
//   supabaseServerConfig.serviceRoleKey,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false
//     }
//   }
// );

export const validateSupabaseServerConfig = (): boolean => {
  return !!(supabaseServerConfig.url && supabaseServerConfig.serviceRoleKey);
};

// Database connection helper (for future use)
export const getSupabaseConnection = () => {
  if (!validateSupabaseServerConfig()) {
    throw new Error("Supabase configuration is incomplete. Please check your environment variables.");
  }
  
  // Return connection details for database operations
  return {
    url: supabaseServerConfig.url,
    serviceRoleKey: supabaseServerConfig.serviceRoleKey
  };
};

// Storage configuration
export const STORAGE_CONFIG = {
  buckets: {
    gallery: {
      public: true,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
    },
    documents: {
      public: false,
      allowedMimeTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      fileSizeLimit: 10 * 1024 * 1024, // 10MB
    }
  }
};

// Authentication helpers
export const AUTH_CONFIG = {
  jwtExpiryTime: 7 * 24 * 60 * 60, // 7 days in seconds
  refreshTokenExpiryTime: 30 * 24 * 60 * 60, // 30 days in seconds
  passwordResetExpiryTime: 24 * 60 * 60, // 24 hours in seconds
};
