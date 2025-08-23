-- Treasure-Home School Database Seed Script
-- This script creates the necessary tables and inserts demo data
-- Run this script after setting up your Supabase project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    audience TEXT[] NOT NULL DEFAULT '{}',
    created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create question_bank table for exam system
CREATE TABLE IF NOT EXISTS question_bank (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    type TEXT NOT NULL CHECK (type IN ('mcq', 'short')),
    body TEXT NOT NULL,
    options JSONB,
    answer_key TEXT NOT NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create exams table
CREATE TABLE IF NOT EXISTS exams (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create exam_questions junction table
CREATE TABLE IF NOT EXISTS exam_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    question_id UUID REFERENCES question_bank(id) ON DELETE CASCADE,
    points INTEGER NOT NULL
);

-- Create exam_attempts table
CREATE TABLE IF NOT EXISTS exam_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    score NUMERIC,
    auto_graded BOOLEAN DEFAULT FALSE
);

-- Create exam_answers table
CREATE TABLE IF NOT EXISTS exam_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    attempt_id UUID REFERENCES exam_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES question_bank(id) ON DELETE CASCADE,
    answer JSONB,
    is_correct BOOLEAN
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can read their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can create profiles" ON profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles" ON profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete profiles" ON profiles
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for announcements
CREATE POLICY "Everyone can read announcements" ON announcements
    FOR SELECT USING (true);

CREATE POLICY "Admins and teachers can create announcements" ON announcements
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'teacher')
        )
    );

CREATE POLICY "Admins and teachers can update their announcements" ON announcements
    FOR UPDATE USING (
        created_by = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete announcements" ON announcements
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for gallery
CREATE POLICY "Everyone can read gallery" ON gallery
    FOR SELECT USING (true);

CREATE POLICY "Admins and teachers can upload to gallery" ON gallery
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'teacher')
        )
    );

CREATE POLICY "Admins and uploaders can delete gallery items" ON gallery
    FOR DELETE USING (
        uploaded_by = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create storage bucket for gallery (run this in Supabase Storage settings)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Storage policy for gallery bucket
-- CREATE POLICY "Gallery images are publicly accessible" ON storage.objects
--     FOR SELECT USING (bucket_id = 'gallery');

-- CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
--     FOR INSERT WITH CHECK (
--         bucket_id = 'gallery' AND 
--         auth.role() = 'authenticated'
--     );

-- CREATE POLICY "Users can delete their own gallery uploads" ON storage.objects
--     FOR DELETE USING (
--         bucket_id = 'gallery' AND 
--         auth.uid()::text = (storage.foldername(name))[1]
--     );

-- Insert demo data (remove this section in production)
-- Demo Admin User
INSERT INTO profiles (id, email, name, role) VALUES 
    (uuid_generate_v4(), 'admin@treasurehomeschool.edu.ng', 'Administrator', 'admin');

-- Demo Teacher
INSERT INTO profiles (id, email, name, role) VALUES 
    (uuid_generate_v4(), 'teacher@treasurehomeschool.edu.ng', 'John Adebayo', 'teacher');

-- Demo Student
INSERT INTO profiles (id, email, name, role) VALUES 
    (uuid_generate_v4(), 'student@treasurehomeschool.edu.ng', 'Chioma Nwankwo', 'student');

-- Demo Parent
INSERT INTO profiles (id, email, name, role) VALUES 
    (uuid_generate_v4(), 'parent@treasurehomeschool.edu.ng', 'Mrs. Adunni Oladapo', 'parent');

-- Demo Announcements
INSERT INTO announcements (title, content, audience, created_by) VALUES 
    (
        'End of Term Examination Schedule',
        'The final examinations for this term will commence on January 15th, 2024. Please ensure all students are well prepared and have reviewed their study materials. Exam timetables will be distributed to all classes by the end of this week.',
        ARRAY['all'],
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    ),
    (
        'Parent-Teacher Conference',
        'We invite all parents to attend the upcoming parent-teacher conference scheduled for December 20th. This is an important opportunity to discuss your child''s progress and development with their teachers.',
        ARRAY['parents'],
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    ),
    (
        'Professional Development Workshop',
        'All teaching staff are required to attend the professional development workshop on modern teaching methodologies scheduled for December 18th in the main hall.',
        ARRAY['staff'],
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    );

-- Demo Gallery Items
INSERT INTO gallery (title, description, file_url, uploaded_by) VALUES 
    (
        'Science Laboratory',
        'Students conducting experiments in our modern science laboratory',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    ),
    (
        'Sports Field',
        'Students enjoying physical activities on our sports field',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    ),
    (
        'Library',
        'Students studying in our modern library facility',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    ),
    (
        'Art Class',
        'Students expressing creativity in our art classroom',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    ),
    (
        'Cafeteria',
        'Students enjoying meals in our school cafeteria',
        'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    ),
    (
        'Graduation Ceremony',
        'Celebrating our students'' achievements at graduation',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
    );

-- Demo Question Bank (for future exam system)
INSERT INTO question_bank (subject, topic, difficulty, type, body, options, answer_key, created_by) VALUES 
    (
        'Mathematics',
        'Algebra',
        'easy',
        'mcq',
        'What is 2 + 2?',
        '["3", "4", "5", "6"]',
        '4',
        (SELECT id FROM profiles WHERE role = 'teacher' LIMIT 1)
    ),
    (
        'English',
        'Grammar',
        'medium',
        'mcq',
        'Which of the following is a noun?',
        '["Run", "Beautiful", "House", "Quickly"]',
        'House',
        (SELECT id FROM profiles WHERE role = 'teacher' LIMIT 1)
    );

-- Demo Exam (for future exam system)
INSERT INTO exams (title, subject, duration_minutes, total_marks, published, created_by) VALUES 
    (
        'Mathematics Mid-term Exam',
        'Mathematics',
        90,
        100,
        false,
        (SELECT id FROM profiles WHERE role = 'teacher' LIMIT 1)
    );

-- Link questions to exam
INSERT INTO exam_questions (exam_id, question_id, points) VALUES 
    (
        (SELECT id FROM exams WHERE title = 'Mathematics Mid-term Exam'),
        (SELECT id FROM question_bank WHERE subject = 'Mathematics' LIMIT 1),
        5
    );

COMMIT;
