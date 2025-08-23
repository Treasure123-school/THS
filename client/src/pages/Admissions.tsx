import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, FileText, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admissions() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Application Submitted",
      description: "Thank you! We'll contact you within 48 hours to schedule your interview.",
    });

    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-bg py-20" data-testid="admissions-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Treasure-Home School
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Begin your child's journey towards academic excellence and moral development. 
              Our admissions process is designed to be straightforward and welcoming.
            </p>
          </div>
        </div>
      </section>

      {/* Admissions Process */}
      <section className="py-16 bg-white" data-testid="admissions-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admissions Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process ensures we find the right fit for your child's educational journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-t-4 border-t-primary-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Submit Application</h3>
                <p className="text-gray-600 mb-6">
                  Complete our online application form with required documents including birth certificate, 
                  previous school records, and passport photographs.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Online application form</li>
                  <li>• Birth certificate</li>
                  <li>• Previous school records</li>
                  <li>• Passport photographs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-secondary-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Assessment & Interview</h3>
                <p className="text-gray-600 mb-6">
                  A friendly assessment to understand your child's academic level, followed by a 
                  parent-student interview to discuss goals and expectations.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Age-appropriate assessment</li>
                  <li>• Parent interview</li>
                  <li>• School tour</li>
                  <li>• Q&A session</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-accent-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Welcome to School</h3>
                <p className="text-gray-600 mb-6">
                  Receive your admission offer and complete enrollment. We'll guide you through 
                  orientation and help your child settle into our community.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Admission letter</li>
                  <li>• Fee payment</li>
                  <li>• Orientation program</li>
                  <li>• Class assignment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50" data-testid="application-form">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Online Application Form</h2>
            <p className="text-gray-600">
              Fill out the form below to begin the admissions process. All fields marked with * are required.
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required data-testid="input-firstName" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required data-testid="input-lastName" />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input id="dateOfBirth" type="date" required data-testid="input-dateOfBirth" />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select required>
                        <SelectTrigger data-testid="select-gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="gradeApplying">Grade Applying For *</Label>
                      <Select required>
                        <SelectTrigger data-testid="select-grade">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nursery">Nursery</SelectItem>
                          <SelectItem value="primary1">Primary 1</SelectItem>
                          <SelectItem value="primary2">Primary 2</SelectItem>
                          <SelectItem value="primary3">Primary 3</SelectItem>
                          <SelectItem value="primary4">Primary 4</SelectItem>
                          <SelectItem value="primary5">Primary 5</SelectItem>
                          <SelectItem value="primary6">Primary 6</SelectItem>
                          <SelectItem value="jss1">JSS 1</SelectItem>
                          <SelectItem value="jss2">JSS 2</SelectItem>
                          <SelectItem value="jss3">JSS 3</SelectItem>
                          <SelectItem value="ss1">SS 1</SelectItem>
                          <SelectItem value="ss2">SS 2</SelectItem>
                          <SelectItem value="ss3">SS 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="previousSchool">Previous School</Label>
                      <Input id="previousSchool" data-testid="input-previousSchool" />
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="parentName">Full Name *</Label>
                      <Input id="parentName" required data-testid="input-parentName" />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relationship to Student *</Label>
                      <Select required>
                        <SelectTrigger data-testid="select-relationship">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="father">Father</SelectItem>
                          <SelectItem value="mother">Mother</SelectItem>
                          <SelectItem value="guardian">Guardian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required data-testid="input-email" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required data-testid="input-phone" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Home Address *</Label>
                      <Textarea id="address" required data-testid="textarea-address" />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  <div>
                    <Label htmlFor="specialNeeds">Special Needs or Medical Conditions</Label>
                    <Textarea 
                      id="specialNeeds" 
                      placeholder="Please describe any special needs, medical conditions, or learning requirements"
                      data-testid="textarea-specialNeeds"
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    className="btn-primary px-8 py-3"
                    disabled={isSubmitting}
                    data-testid="submit-application"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-white" data-testid="important-dates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Dates</h2>
            <p className="text-gray-600">Mark your calendar with these important admissions milestones.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Application Deadline</h4>
                <p className="text-sm text-gray-600">March 31, 2024</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-secondary-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Assessment Period</h4>
                <p className="text-sm text-gray-600">April 1-15, 2024</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-accent-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Admission Letters</h4>
                <p className="text-sm text-gray-600">April 30, 2024</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">School Resumption</h4>
                <p className="text-sm text-gray-600">September 2, 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-gray-50" data-testid="fee-structure">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fee Structure</h2>
            <p className="text-gray-600">Transparent and competitive fee structure for the 2024/2025 academic session.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nursery & Primary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuition (per term)</span>
                    <span className="font-medium">₦150,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development Levy</span>
                    <span className="font-medium">₦25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uniform & Books</span>
                    <span className="font-medium">₦30,000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total (per term)</span>
                    <span>₦205,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Junior Secondary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuition (per term)</span>
                    <span className="font-medium">₦180,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development Levy</span>
                    <span className="font-medium">₦30,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uniform & Books</span>
                    <span className="font-medium">₦35,000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total (per term)</span>
                    <span>₦245,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Senior Secondary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuition (per term)</span>
                    <span className="font-medium">₦220,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development Levy</span>
                    <span className="font-medium">₦35,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uniform & Books</span>
                    <span className="font-medium">₦40,000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total (per term)</span>
                    <span>₦295,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              * Fees are payable termly. Payment plans available. Contact us for more information.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
