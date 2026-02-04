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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactModal({ children, onOpenChange }: { children: React.ReactNode, onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    const mailtoLink = `mailto:joelsofflmail@gmail.com?subject=Contact from ${encodeURIComponent(
      data.name
    )}&body=${encodeURIComponent(data.message)}%0A%0AFrom:%0A${encodeURIComponent(
      data.name
    )}%0A${encodeURIComponent(data.email)}`;
    
    window.location.href = mailtoLink;
    setOpen(false);
    form.reset();
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
            Fill out the form below. This will open your default email client.
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
                'Send via Email Client'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
