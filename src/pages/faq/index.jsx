import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>What does DevPerfection do?</AccordionTrigger>
          <AccordionContent>
            We build modern, scalable, and AI-driven solutions for companies.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>How can I contact you?</AccordionTrigger>
          <AccordionContent>
            You can reach us via the contact form or email us at info@devperfection.com.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
