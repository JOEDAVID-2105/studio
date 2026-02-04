'use client';

import { useFormStatus } from 'react-dom';
import { tailorContentAction, type TailorContentState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { useEffect, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
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
  const initialState: TailorContentState = { data: null, error: null, message: '' };
  const [state, formAction] = useActionState(tailorContentAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state.error, toast]);


  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          D'codes: Intelligent Guide
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Provide a recruitment profile or job description below. My AI assistant, D'code, will explain how I can be a great fit for the role.
        </p>
      </div>

      <Card className="mt-10">
        <CardContent className="p-6">
          <form action={formAction} className="space-y-4">
            <Textarea
              name="recruiterProfile"
              placeholder="e.g., 'Looking for a creative developer with Next.js and Firebase skills for a new AI project...'"
              className="min-h-[120px] bg-secondary border-border"
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      {state.data && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BrainCircuit className="text-accent h-6 w-6" />
                D'code Says...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {state.data.response}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dcodes;
