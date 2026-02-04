'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactModal({ children, onOpenChange }: { children: React.ReactNode, onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const emailJsWindow = window as any;
      if (emailJsWindow.emailjs) {
        await emailJsWindow.emailjs.send(
          'service_x0x57ns',
          'template_wbkl3rk',
          data,
        );
        toast({
          title: 'Email Sent!',
          description: 'Thank you for your message. I will get back to you shortly.',
        });
        setOpen(false);
        form.reset();
      } else {
        throw new Error('EmailJS is not loaded.');
      }
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      const description = error?.text || 'An unknown error occurred. Please check the EmailJS configuration and template variables.';
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: description,
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (onOpenChange) {
        onOpenChange(open);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>
            Have a question or want to work together? Fill out the form below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-card-foreground">Name</Label>
            <Input id="name" {...form.register('name')} className="bg-background" />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-card-foreground">Email</Label>
            <Input id="email" type="email" {...form.register('email')} className="bg-background" />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject" className="text-card-foreground">Subject</Label>
            <Input id="subject" {...form.register('subject')} className="bg-background" />
            {form.formState.errors.subject && (
              <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-card-foreground">Message</Label>
            <Textarea id="message" {...form.register('message')} className="bg-background" />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
