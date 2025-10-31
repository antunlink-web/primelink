import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { t } = useTranslation();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const subject = encodeURIComponent(`Contact from ${data.name}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      );
      
      window.location.href = `mailto:contact@primelink.com?subject=${subject}&body=${body}`;
      
      toast.success("Opening your email client...", {
        duration: 3000,
      });
      
      form.reset();
    } catch (error) {
      toast.error("Failed to open email client. Please try again.", {
        duration: 5000,
      });
    }
  };
  
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 glow-text">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('contact.description')}
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--shadow-xl)] hover:shadow-[var(--shadow-glow)] transition-all">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="bg-secondary/50 border-[var(--glass-border)] focus:border-primary transition-colors"
                          />
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
                        <FormLabel className="text-foreground">Email *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@example.com" 
                            {...field} 
                            className="bg-secondary/50 border-[var(--glass-border)] focus:border-primary transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project or inquiry..." 
                          {...field} 
                          rows={6}
                          className="bg-secondary/50 border-[var(--glass-border)] focus:border-primary transition-colors resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-lg px-8 py-6 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] transition-all hover:scale-[1.02] glow-border"
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  {!form.formState.isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] hover:shadow-[var(--shadow-glow)] hover:glow-border transition-all hover:-translate-y-1 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:shadow-[var(--shadow-glow)] transition-all">
              <Mail className="h-6 w-6 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('contact.email')}</h3>
            <p className="text-muted-foreground">contact@primelink.com</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] hover:shadow-[var(--shadow-glow)] hover:glow-border transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "100ms" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('contact.call')}</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] hover:shadow-[var(--shadow-glow)] hover:glow-border transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('contact.visit')}</h3>
            <p className="text-muted-foreground">123 Tech Street, San Francisco</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
