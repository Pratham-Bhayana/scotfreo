import { useRef, useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { sendContactForm } from "@/lib/utils";

// Contact form validation schema with enhanced error messages
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(3, {
    message: "Subject must be at least 3 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const { toast } = useToast();
  
  const [sendingStatus, setSendingStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  // Animation sequence when section becomes visible
  useEffect(() => {
    if (isVisible) {
      // Animate in sequence
      setTimeout(() => {
        headerRef.current?.classList.add('animate-fadeIn');
      }, 200);
      
      setTimeout(() => {
        infoRef.current?.classList.add('animate-slideIn');
      }, 400);
      
      setTimeout(() => {
        formRef.current?.classList.add('animate-slideInRight');
      }, 600);
    }
  }, [isVisible]);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sendContactForm,
    onMutate: () => {
      setSendingStatus('sending');
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. We will get back to you soon.",
      });
      form.reset();
      setSendingStatus('success');
      
      // Reset status after a delay
      setTimeout(() => {
        setSendingStatus('idle');
      }, 3000);
    },
    onError: (error) => {
      setSendingStatus('error');
      toast({
        title: "Message Could Not Be Sent",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
      
      // Reset status after a delay
      setTimeout(() => {
        setSendingStatus('idle');
      }, 3000);
    },
  });

  function onSubmit(data: ContactFormValues) {
    mutate(data);
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen relative snap-section bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] py- 16 md:py-16 md:mt-14 z:-1"
    >
      {/* Subtle background texture */}
      <div className="relative inset-0 opacity-5">
        <div className="w-full h-full" style={{ 
          backgroundImage: `url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
        }}></div>
      </div> 

      {/* Premium section header */}
      <div 
        ref={headerRef} 
  className="px-4 pt-12 pb-8 text-center opacity-0"      >
        <h2 className="text-5xl md:text-7xl font-bold gold-gradient-text mb-4 mt-12">GET IN TOUCH</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#BF953F] to-[#FFC832] mx-auto mb-6"></div>
        <p className="text-lg opacity-80 max-w-xl mx-auto">
          Ready to create something extraordinary? Reach out to discuss your next project.
        </p>
      </div>
      
      <div className="container mx-auto px-4 py-2 md:py-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
          {/* Contact information with premium styling */}
          <div 
            ref={infoRef}
            className="w-full lg:w-1/2 gold-card rounded-lg lg:rounded-r-none overflow-hidden opacity-0 relative p-0"
          >
            {/* Left background image with overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.1.0&auto=format&fit=crop&w=1000&q=80" 
                alt="Film production set" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-10 md:p-12 h-full flex flex-col">
              {/* Gold accent element */}
              <div className="absolute -top-10 -left-10 w-40 h-40 opacity-20">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#D4AF37" />
                </svg>
              </div>
              
              <div className="mb-12">
                <h3 className="text-3xl font-bold mb-4">Let's Create Together</h3>
                <p className="text-base opacity-80 max-w-md">
                  Have a project in mind? Reach out to discuss how we can bring your vision to life with our premium cinematic approach.
                </p>
              </div>
              
              <div className="space-y-6 mb-auto">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-4 gold-card">
                    <i className="fas fa-map-marker-alt text-[#D4AF37] text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-[#D4AF37] font-semibold mb-1">Location</h4>
                    <p className="opacity-80">New Delhi, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-4 gold-card">
                    <i className="fas fa-envelope text-[#D4AF37] text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-[#D4AF37] font-semibold mb-1">Email</h4>
                    <a 
                      href="mailto:anil@scotfreo.com" 
                      className="opacity-80 hover:text-[#FFC832] hover:opacity-100 transition-all"
                    >
                      anil@scotfreo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-4 gold-card">
                    <i className="fas fa-phone text-[#D4AF37] text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-[#D4AF37] font-semibold mb-1">Phone</h4>
                    <a 
                      href="tel:+918851964979" 
                      className="opacity-80 hover:text-[#FFC832] hover:opacity-100 transition-all"
                    >
                      +91 8851 964 979
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/scotfreo?igsh=MWp3eXdnbHZpM2tqMA==" 
                    className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-black/20 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href="https://x.com/scotfreo1?t=7KBTLCXjfUXWCQPUgUzrlQ&s=09" 
                    className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-black/20 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href="https://wa.me/+918851964979" 
                    className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-black/20 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form with premium styling */}
          <div 
            ref={formRef} 
            className="w-full lg:w-1/2 gold-card rounded-lg lg:rounded-l-none p-6 md:p-10 opacity-0"
          >
            <div className="mb-10">
              <h3 className="text-3xl font-bold mb-2">Send Us A Message</h3>
              <p className="opacity-70">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#D4AF37] font-medium">Your Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field} 
                              className="form-input bg-[#161616] border-[#D4AF37]/20 rounded-md py-3 px-4 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors pl-10" 
                              placeholder="John Doe"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <i className="fas fa-user text-[#D4AF37]/50"></i>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#D4AF37] font-medium">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field} 
                              type="email"
                              className="form-input bg-[#161616] border-[#D4AF37]/20 rounded-md py-3 px-4 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors pl-10" 
                              placeholder="email@example.com"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <i className="fas fa-envelope text-[#D4AF37]/50"></i>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#D4AF37] font-medium">Subject</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            {...field} 
                            className="form-input bg-[#161616] border-[#D4AF37]/20 rounded-md py-3 px-4 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors pl-10" 
                            placeholder="Project Inquiry"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-align-left text-[#D4AF37]/50"></i>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#D4AF37] font-medium">Your Message</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea 
                            {...field} 
                            rows={5}
                            className="form-input bg-[#161616] border-[#D4AF37]/20 rounded-md py-3 px-4 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors pl-10 resize-none" 
                            placeholder="Tell us about your project..."
                          />
                          <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                            <i className="fas fa-pen-fancy text-[#D4AF37]/50"></i>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#BF953F] to-[#D4AF37] text-black font-bold rounded-md hover:from-[#D4AF37] hover:to-[#FFC832] transition-all duration-300 flex items-center justify-center"
                  >
                    {sendingStatus === 'sending' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        SENDING MESSAGE
                      </>
                    ) : sendingStatus === 'success' ? (
                      <>
                        <i className="fas fa-check mr-2"></i>
                        MESSAGE SENT!
                      </>
                    ) : sendingStatus === 'error' ? (
                      <>
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        PLEASE TRY AGAIN
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
