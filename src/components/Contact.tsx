import { Button } from "@/components/ui/button";
import { CalendarCheck, Mail, Phone, MapPin } from "lucide-react";
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

const WEB3FORMS_ACCESS_KEY = "7a6fbce5-f71b-4f52-a58e-12bcbbd3a492";

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { t } = useTranslation();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `New Contact Form Submission from ${data.name}`,
          from_name: "PrimeLink Contact Form",
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.", { duration: 5000 });
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again or contact us directly.", { duration: 5000 });
    }
  };
  
  return (
    <section id="contact" className="py-28 bg-card relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('contact.description')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-background border border-border rounded-2xl p-8 shadow-[var(--shadow-card)]">
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
                          <Input placeholder="Your name" {...field} className="bg-secondary/50 border-border focus:border-primary transition-colors" />
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
                          <Input type="email" placeholder="your.email@example.com" {...field} className="bg-secondary/50 border-border focus:border-primary transition-colors" />
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
                        <Textarea placeholder="Tell us about your project or inquiry..." {...field} rows={6} className="bg-secondary/50 border-border focus:border-primary transition-colors resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] transition-all"
                >
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  {form.formState.isSubmitting ? "Sending..." : t('contact.schedule')}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">{t('contact.email')}</h3>
            <a href="mailto:primelink@primelink.hr" className="text-sm text-muted-foreground hover:text-primary transition-colors">primelink@primelink.hr</a>
          </div>
          <div className="text-center p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">{t('contact.call')}</h3>
            <a href="tel:+385915122888" className="text-sm text-muted-foreground hover:text-primary transition-colors">+385 91 512 2888</a>
          </div>
          <div className="text-center p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">{t('contact.visit')}</h3>
            <p className="text-sm text-muted-foreground">Zagreb, Hrvatska</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
