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
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Tailoring...
        </>
      ) : (
        'Tailor Content'
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
          D'codes: Intelligent Content
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Paste a recruiter's profile or job description below. My AI assistant
          will tailor my skills and experiences to match.
        </p>
      </div>

      <Card className="mt-10">
        <CardContent className="p-6">
          <form action={formAction} className="space-y-4">
            <Textarea
              name="recruiterProfile"
              placeholder="e.g., 'Hiring a Senior Frontend Engineer with experience in React and Next.js for a fast-growing fintech startup...'"
              className="min-h-[120px] bg-secondary border-border"
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      {state.data && (
        <div className="mt-8 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BrainCircuit className="text-accent"/>
                        AI Reasoning
                    </CardTitle>
                    <CardDescription>{state.data.reasoning}</CardDescription>
                </CardHeader>
            </Card>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Tailored Skills</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {state.data.tailoredSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Relevant Experiences</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {state.data.tailoredExperiences.map((exp) => (
                  <Badge key={exp} variant="secondary" className="text-sm">
                    {exp}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dcodes;
