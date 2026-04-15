"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQData {
  question: string;
  answer: string;
}

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="w-1 h-6 bg-gray-900 rounded-full flex-shrink-0 mt-0.5" />
        <span className="flex-1 text-gray-900 font-medium pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-900 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 pl-5 pr-8 text-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQAccordion({ faqs }: { faqs: FAQData[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openFaq === index}
          onClick={() => setOpenFaq(openFaq === index ? null : index)}
        />
      ))}
    </>
  );
}
