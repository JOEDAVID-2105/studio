import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/lib/data';

const Faq = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="font-headline text-xl sm:text-3xl font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-sm sm:text-lg text-muted-foreground">
          A few quick answers to common questions. If you have others, feel free
          to reach out.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full mt-10">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left font-semibold text-sm sm:text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-xs sm:text-base whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
