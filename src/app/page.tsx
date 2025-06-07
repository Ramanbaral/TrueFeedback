import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Shield, Users, Zap, Star, ArrowRight, Eye, Lock } from "lucide-react";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TrueFeedback</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                How it Works
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                Testimonials
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {session != null ? (
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Link href="/sign-up">Sign Out</Link>
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-teal-100 text-teal-800 hover:bg-teal-200">
            <Shield className="w-4 h-4 mr-2" />
            100% Anonymous & Secure
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get Honest Feedback
            <span className="block text-teal-600">Without the Fear</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            TrueFeedback empowers your team to share honest, anonymous feedback that drives real
            change. Build trust, improve communication, and create a better workplace culture.
          </p>

          {/* Main Dashboard Button */}
          <div className="mb-12">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              <Link href="/dashboard">Go to Dashboard</Link>
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              Watch Demo
            </Button>
            <Button variant="ghost" size="lg" className="text-gray-600 hover:text-teal-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TrueFeedback?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to encourage honest communication while maintaining complete
              anonymity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-teal-100 hover:border-teal-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-teal-900">Complete Anonymity</CardTitle>
                <CardDescription>
                  Your identity is never revealed. Share feedback without fear of retaliation or
                  judgment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:border-teal-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-teal-900">Secure & Private</CardTitle>
                <CardDescription>
                  Enterprise-grade security ensures your feedback remains confidential and
                  protected.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:border-teal-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-teal-900">Real-time Insights</CardTitle>
                <CardDescription>
                  Get instant feedback and analytics to make data-driven decisions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:border-teal-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-teal-900">Team Collaboration</CardTitle>
                <CardDescription>
                  Foster open communication and build stronger relationships within your
                  organization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:border-teal-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-teal-900">Easy to Use</CardTitle>
                <CardDescription>
                  Simple, intuitive interface that makes giving and receiving feedback effortless.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:border-teal-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-teal-900">Trusted Platform</CardTitle>
                <CardDescription>
                  Join thousands of organizations that trust TrueFeedback for honest communication.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-15 px-4 sm:px-6 lg:px-8 bg-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How TrueFeedback Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with anonymous feedback is simple and straightforward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Account</h3>
              <p className="text-gray-600">Sign up for free and set up your account in seconds.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share your link</h3>
              <p className="text-gray-600">Share your link in groups or socials.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recieve Feedbacks</h3>
              <p className="text-gray-600">
                receive insights to make informed decisions and improve yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how TrueFeedback is transforming workplace communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-teal-100">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "TrueFeedback has revolutionized how our team communicates. The anonymity gives
                  everyone a voice."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-teal-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah M.</p>
                    <p className="text-sm text-gray-600">HR Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-100">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Finally, a platform where employees feel safe to share honest feedback. Game
                  changer!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-teal-600 font-semibold">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John D.</p>
                    <p className="text-sm text-gray-600">Team Lead</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-100">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The insights we get from TrueFeedback help us make better decisions for our
                  company culture."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-teal-600 font-semibold">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Alex L.</p>
                    <p className="text-sm text-gray-600">CEO</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TrueFeedback</span>
              </div>
              <p className="text-gray-400">
                Empowering honest communication through anonymous feedback.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TrueFeedback. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
