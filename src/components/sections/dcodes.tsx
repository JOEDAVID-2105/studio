'use client';

import { useFormStatus } from 'react-dom';
import { tailorContentAction, type TailorContentState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Mail } from 'lucide-react';
import { useEffect, useActionState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ContactModal } from '@/components/contact-modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...
        </>
      ) : (
        "Ask D'code"
      )}
    </Button>
  );
}

const Dcodes = () => {
  const initialState: TailorContentState = { data: null, error: null, message: '', userInput: undefined };
  const [state, formAction, isPending] = useActionState(tailorContentAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
    if (state.data || state.error) {
        formRef.current?.reset();
        setTimeout(() => {
            chatContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    }
  }, [state, toast]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          D'codes: Intelligent Guide
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Ask my AI assistant, D'code, about a role, and it will explain how I can be a great fit.
        </p>
      </div>

      <div ref={chatContainerRef} className="mt-10 space-y-6 min-h-[200px]">
        {state.userInput && (
          <div className="flex items-start justify-end gap-3">
             <div className="rounded-lg bg-primary p-4 max-w-xl">
               <p className="text-primary-foreground">{state.userInput}</p>
             </div>
             <Avatar>
               <AvatarFallback>U</AvatarFallback>
             </Avatar>
          </div>
        )}
        
        {isPending && (
            <div className="flex items-start gap-3">
             <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-accent shrink-0">
                <Image src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/Whisk_226d7aa74fcf94b9b3048a44a6dd1758dr.png" alt="D'code avatar" fill className="object-cover" />
            </div>
             <div className="rounded-lg bg-secondary p-4 max-w-xl">
                <p className="text-secondary-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> D'code is thinking...</p>
             </div>
           </div>
        )}

        {state.data && (
          <div className="flex items-start gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-accent shrink-0">
                <Image src="https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/Whisk_226d7aa74fcf94b9b3048a44a6dd1758dr.png" alt="D'code avatar" fill className="object-cover" />
            </div>
            <div className="rounded-lg bg-secondary p-4 max-w-xl">
              <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {state.data.response}
              </p>
              <div className="mt-4">
                <ContactModal>
                  <Button variant="outline" className="bg-accent border-accent text-accent-foreground hover:bg-accent/90">
                    <Mail className="mr-2 h-4 w-4" /> Contact Joel
                  </Button>
                </ContactModal>
              </div>
            </div>
          </div>
        )}
      </div>

      <Card className="mt-8 sticky bottom-4 z-10 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6">
          <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row items-stretch gap-4">
            <Textarea
              name="recruiterProfile"
              placeholder="e.g., 'Looking for a creative developer with Next.js skills...'"
              className="min-h-[60px] sm:min-h-[40px] flex-grow bg-background border-border"
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dcodes;
