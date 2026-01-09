import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CourseCategories from "@/components/CourseCategories";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CourseCategories />
      <Features />
      <Testimonials />
      
      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Join thousands of students who have already transformed their careers and lives through our courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Browse Courses
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10 text-lg px-8 py-6">
              Contact an Advisor
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
