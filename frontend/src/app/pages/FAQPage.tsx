import AppSidebar from "@/app/elements/app-sidebar";
import { Footer } from "@/app/elements/footer";
import { Header } from "@/app/elements/header";
import PosterCarousel from "@/app/elements/poster-carousel";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function FAQPage() {
    const faqs = [
        {
        question: "How can I book a movie ticket?",
        answer:
            "Simply choose your movie, select seats, add food & drinks, and proceed to checkout.",
        },
        {
        question: "Which payment methods are accepted?",
        answer: "We accept credit/debit cards, Momo, ZaloPay, and cash.",
        },
        {
        question: "How do I get my booking confirmation?",
        answer:
            "You can view it in Booking Management inside the tab panel.",
        },
    ];

    return (
        <div className="min-h-screen bg-jet-black shadow-lg">
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <div className="flex-1 flex flex-col">
                {/*Header */}
                <Header/>
            
                {/*Poster Carousel */}
                <PosterCarousel/>

                <h1 className="text-3xl font-bold my-6 mx-4 font-poppins text-white">
                    Frequently Asked Questions
                </h1>

                <Accordion type="single" collapsible className="space-y-2">
                    {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                        <AccordionTrigger className="mx-5 my-3 p-2 text-left text-lg font-medium font-poppins text-black bg-gray-200 hover:bg-gray-300 focus:bg-gray-300">
                        {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-lg p-2 mx-3 font-poppins text-gray-300">
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>


                <Footer/>
            </div>
        </SidebarProvider>
        
        </div>
    );
}
