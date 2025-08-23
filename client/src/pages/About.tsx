import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Award, Heart, Target, Eye } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-bg py-20" data-testid="about-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Treasure-Home School
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over a decade, we have been committed to providing qualitative education 
              and moral excellence to students in Seriki-Soyinka, Ifo, Ogun State and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white" data-testid="mission-vision">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-l-4 border-l-primary-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-primary-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide comprehensive, quality education that nurtures academic excellence, 
                  character development, and moral values. We strive to create an environment 
                  where every student can discover their potential and develop into responsible, 
                  productive members of society.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="h-8 w-8 text-secondary-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading educational institution in our community, recognized for 
                  academic excellence, innovative teaching methods, and the production of 
                  well-rounded individuals who contribute positively to society while 
                  maintaining strong moral foundations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50" data-testid="core-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide everything we do and shape the character 
              of our educational community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Academic Excellence</h4>
              <p className="text-gray-600 text-sm">
                Commitment to the highest standards of learning and intellectual development.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-secondary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Moral Integrity</h4>
              <p className="text-gray-600 text-sm">
                Building character through ethical principles and moral responsibility.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600 text-sm">
                Fostering a supportive, inclusive environment for all students and families.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                Embracing modern teaching methods and educational technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* School History */}
      <section className="py-16 bg-white" data-testid="school-history">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Founded with a vision to transform education in our community, Treasure-Home School 
                  began as a small institution with big dreams. From our humble beginnings, we have 
                  grown to become one of the most respected educational institutions in Ogun State.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our journey has been marked by continuous innovation, dedicated teaching staff, 
                  and a commitment to excellence that has produced outstanding graduates who have 
                  gone on to make significant contributions in various fields.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, we continue to evolve, embracing new technologies and teaching methodologies 
                  while maintaining our core values of quality education and moral excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="School graduation ceremony" 
                className="rounded-2xl shadow-lg w-full"
                data-testid="history-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50" data-testid="leadership-team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced leadership team brings together decades of educational expertise 
              and passion for student success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Principal</h3>
                <p className="text-gray-600 mb-4">Educational Leadership</p>
                <p className="text-sm text-gray-500">
                  Providing strategic direction and academic oversight to ensure excellence in education.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-12 w-12 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Academic Director</h3>
                <p className="text-gray-600 mb-4">Curriculum Development</p>
                <p className="text-sm text-gray-500">
                  Overseeing curriculum design and implementation to meet modern educational standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-12 w-12 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Affairs</h3>
                <p className="text-gray-600 mb-4">Student Development</p>
                <p className="text-sm text-gray-500">
                  Focusing on student welfare, counseling, and character development programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-white" data-testid="facilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art facilities designed to enhance learning and provide the best 
              educational experience for our students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Science Laboratory" 
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Science Laboratories</h4>
              <p className="text-gray-600 text-sm">
                Modern, well-equipped laboratories for physics, chemistry, and biology experiments.
              </p>
            </div>

            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Library" 
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Library & Resource Center</h4>
              <p className="text-gray-600 text-sm">
                Extensive collection of books, digital resources, and quiet study spaces.
              </p>
            </div>

            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Sports Facilities" 
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Sports Complex</h4>
              <p className="text-gray-600 text-sm">
                Multi-purpose sports facilities including football field, basketball court, and athletics track.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
