import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone, Users, BookOpen, Trophy, Building } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnnouncementCard from "@/components/AnnouncementCard";
import GalleryCard from "@/components/GalleryCard";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  // Fetch latest announcements
  const { data: announcements = [], isLoading: announcementsLoading } = useQuery({
    queryKey: ["/api/announcements"],
  });

  // Fetch gallery items
  const { data: galleryItems = [], isLoading: galleryLoading } = useQuery({
    queryKey: ["/api/gallery"],
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-bg py-20" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Welcome to <span className="text-primary-600">Treasure-Home School</span>
                </h1>
                <p className="text-xl text-gray-600 font-medium" data-testid="school-motto">
                  Qualitative Education and Moral Excellence
                </p>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Nurturing young minds with comprehensive education, character building, and innovative learning approaches. Located in the heart of Seriki-Soyinka, Ifo, Ogun.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admissions">
                  <Button className="btn-accent text-lg px-8 py-4 shadow-lg hover:shadow-xl" data-testid="cta-enroll">
                    Enroll Your Child Now
                  </Button>
                </Link>
                <Link href="/admissions">
                  <Button variant="outline" className="btn-outline text-lg px-8 py-4" data-testid="cta-admissions">
                    Visit Admissions
                  </Button>
                </Link>
              </div>

              {/* Quick Contact Info */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2" data-testid="hero-location">
                  <MapPin className="text-primary-500 h-4 w-4" />
                  <span>Seriki-Soyinka, Ifo, Ogun</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="hero-phone">
                  <Phone className="text-primary-500 h-4 w-4" />
                  <span>+234 XXX XXX XXXX</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern school building with students" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="hero-image"
              />
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg" data-testid="stat-students">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-500">Students</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg" data-testid="stat-teachers">
                <div className="text-2xl font-bold text-secondary-600">50+</div>
                <div className="text-sm text-gray-500">Teachers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Preview */}
      <section className="py-16 bg-white" data-testid="announcements-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Announcements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news and important information from our school community.
            </p>
          </div>

          {announcementsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : announcements.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {announcements.slice(0, 3).map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
              <div className="text-center">
                <Link href="/announcements">
                  <Button className="btn-primary" data-testid="view-all-announcements">
                    View All Announcements
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <EmptyState
              title="No Announcements Yet"
              description="Check back soon for important updates and news."
            />
          )}
        </div>
      </section>

      {/* Admissions Highlight */}
      <section className="py-16 gradient-primary text-white" data-testid="admissions-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Ready to Join Our School Community?</h2>
              <p className="text-primary-100 text-lg leading-relaxed">
                Our admissions process is designed to be simple and straightforward. We welcome students who are eager to learn and grow in a nurturing environment focused on academic excellence and character development.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Submit Application</h4>
                    <p className="text-primary-100 text-sm">Complete our online application form with required documents</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Assessment & Interview</h4>
                    <p className="text-primary-100 text-sm">Simple assessment and parent-student interview</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Welcome to School</h4>
                    <p className="text-primary-100 text-sm">Receive admission offer and join our community</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/admissions">
                  <Button className="bg-white text-primary-600 hover:bg-gray-50" data-testid="start-application">
                    Start Application
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary-600" data-testid="download-brochure">
                  Download Brochure
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Students engaged in classroom learning" 
                className="rounded-xl shadow-2xl w-full h-auto"
                data-testid="admissions-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-gray-50" data-testid="gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">School Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a glimpse into our vibrant school life, modern facilities, and memorable moments.
            </p>
          </div>

          {galleryLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200 aspect-square rounded-xl"></div>
              ))}
            </div>
          ) : galleryItems.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {galleryItems.slice(0, 6).map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </div>
              <div className="text-center">
                <Link href="/gallery">
                  <Button className="btn-primary" data-testid="view-full-gallery">
                    View Full Gallery
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <EmptyState
              title="Gallery Coming Soon"
              description="We're preparing beautiful photos of our school to share with you."
            />
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our School in Numbers</h2>
            <p className="text-gray-600">Proudly serving our community with excellence in education</p>
          </div>

          <div className="school-stats">
            <div className="stat-item">
              <div className="stat-icon bg-primary-100">
                <Users className="text-primary-600 text-xl" />
              </div>
              <div className="stat-number" data-testid="stat-students-number">500+</div>
              <div className="stat-label">Students</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon bg-secondary-100">
                <BookOpen className="text-secondary-600 text-xl" />
              </div>
              <div className="stat-number" data-testid="stat-teachers-number">50+</div>
              <div className="stat-label">Teachers</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon bg-accent-100">
                <Building className="text-accent-600 text-xl" />
              </div>
              <div className="stat-number" data-testid="stat-clubs-number">25+</div>
              <div className="stat-label">Clubs & Activities</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon bg-purple-100">
                <Trophy className="text-purple-600 text-xl" />
              </div>
              <div className="stat-number" data-testid="stat-awards-number">15+</div>
              <div className="stat-label">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-gray-600">Hear from parents and students about their experience at Treasure-Home School</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent-500 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed" data-testid="testimonial-1-content">
                  "Treasure-Home School has provided an exceptional learning environment for my daughter. The teachers are dedicated, caring, and truly invested in each child's success. The moral values instilled here complement our family's beliefs perfectly."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="text-primary-600 h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900" data-testid="testimonial-1-name">Mrs. Adunni Oladapo</h4>
                    <p className="text-sm text-gray-500">Parent of Grade 8 Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent-500 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed" data-testid="testimonial-2-content">
                  "I love coming to school every day! My teachers make learning fun and interesting. I've made so many friends here and learned so much. The science lab is my favorite place - we do amazing experiments!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                    <Users className="text-secondary-600 h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900" data-testid="testimonial-2-name">Chioma Nwankwo</h4>
                    <p className="text-sm text-gray-500">Grade 6 Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Teaser */}
      <section className="py-16 bg-primary-900 text-white" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-primary-200 max-w-2xl mx-auto">
              Have questions about admissions, programs, or want to schedule a visit? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary-200 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-primary-200" data-testid="contact-address">Seriki-Soyinka, Ifo, Ogun State</p>
              <p className="text-primary-200 text-sm">Nigeria</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary-200 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-primary-200" data-testid="contact-phone">+234 XXX XXX XXXX</p>
              <p className="text-primary-200 text-sm">Mon - Fri: 8AM - 5PM</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary-200 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-primary-200" data-testid="contact-email">info@treasurehomeschool.edu.ng</p>
              <p className="text-primary-200 text-sm">We'll respond within 24 hours</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button className="btn-accent text-lg px-8 py-4 shadow-lg" data-testid="contact-cta">
                Send Us a Message
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
