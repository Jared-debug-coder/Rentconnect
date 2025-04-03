
import { useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BookOpen, FileText, AlertTriangle, LightbulbIcon, HelpCircle, CalendarClock } from "lucide-react";

type ResourceContent = {
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ReactNode;
};

const ResourcePages = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(category || "rental-guides");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/resources/${value}`);
  };
  
  const resourceContents: Record<string, ResourceContent> = {
    "rental-guides": {
      title: "Rental Guides",
      description: "Everything you need to know about renting properties in Kenya",
      icon: <BookOpen className="h-6 w-6 text-brand-500" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Essential Rental Guides for Kenya</h2>
          
          <div className="prose max-w-none">
            <h3>Understanding Rental Agreements</h3>
            <p>
              Rental agreements in Kenya typically include details about rent payment schedules, 
              security deposits, maintenance responsibilities, and tenancy duration. We recommend 
              always reading the entire agreement before signing and keeping a copy for your records.
            </p>
            
            <h3>Kenya's Rental Laws</h3>
            <p>
              Kenya's rental market is governed by the Landlord and Tenant Act, which outlines the rights 
              and responsibilities of both parties. Key points include:
            </p>
            <ul>
              <li>Landlords must provide a safe, habitable property</li>
              <li>Tenants must pay rent on time and maintain the property</li>
              <li>Security deposits are typically 1-3 months' rent</li>
              <li>Notice periods for termination are typically 30 days</li>
            </ul>
            
            <h3>Neighborhood Guide</h3>
            <p>
              Different neighborhoods in Kenya's major cities offer varied living experiences:
            </p>
            <ul>
              <li><strong>Nairobi:</strong> Westlands and Kilimani are popular for professionals, while Eastlands offers more affordable options</li>
              <li><strong>Mombasa:</strong> Nyali and Bamburi are popular coastal areas with modern apartments</li>
              <li><strong>Kisumu:</strong> Milimani offers upscale housing, while Kondele provides budget-friendly options</li>
            </ul>
            
            <h3>Budgeting for Rent</h3>
            <p>
              When budgeting for a rental in Kenya, consider these additional costs beyond the monthly rent:
            </p>
            <ul>
              <li>Security deposit (typically 1-3 months' rent)</li>
              <li>Utility connections (water, electricity, internet)</li>
              <li>Service charges for apartments</li>
              <li>Moving costs</li>
              <li>Home insurance (optional but recommended)</li>
            </ul>
            
            <h3>First-Time Renter's Checklist</h3>
            <ol>
              <li>Set a clear budget including all additional costs</li>
              <li>Research neighborhoods</li>
              <li>Prepare necessary documentation (ID, proof of income, bank statements)</li>
              <li>Inspect the property thoroughly before signing</li>
              <li>Understand all terms in the rental agreement</li>
              <li>Document the property condition with photos</li>
              <li>Clarify maintenance responsibilities</li>
            </ol>
            
            <div className="bg-brand-50 p-4 rounded-md mt-6">
              <h4 className="font-medium text-brand-700">Need more guidance?</h4>
              <p className="text-brand-600">
                Our property specialists can provide personalized advice for your rental search.
                <Link to="/contact" className="text-brand-700 font-medium ml-1 hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      ),
    },
    "legal-documents": {
      title: "Legal Documents",
      description: "Standard rental contracts and important legal documents",
      icon: <FileText className="h-6 w-6 text-brand-500" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Essential Legal Documents for Renting</h2>
          
          <div className="prose max-w-none">
            <h3>Standard Rental Agreement</h3>
            <p>
              A comprehensive rental agreement is essential for both landlords and tenants. Key sections include:
            </p>
            <ul>
              <li>Names and contact information for all parties</li>
              <li>Property details and description</li>
              <li>Rental amount and payment schedule</li>
              <li>Security deposit amount and conditions</li>
              <li>Lease term and renewal options</li>
              <li>Maintenance responsibilities</li>
              <li>Rules regarding alterations, pets, and subletting</li>
              <li>Termination clauses</li>
            </ul>
            
            <h3>Property Inspection Checklist</h3>
            <p>
              Before moving in, both parties should complete a detailed property inspection checklist that documents:
            </p>
            <ul>
              <li>Condition of walls, floors, and ceilings</li>
              <li>Functionality of plumbing fixtures</li>
              <li>Electrical outlets and lighting</li>
              <li>Appliance condition and operation</li>
              <li>Windows, doors, and locks</li>
              <li>Existing damage or wear</li>
            </ul>
            
            <h3>Security Deposit Receipt</h3>
            <p>
              This document should clearly state:
            </p>
            <ul>
              <li>Amount received</li>
              <li>Date of payment</li>
              <li>Conditions for full refund</li>
              <li>Timeline for deposit return after moving out</li>
            </ul>
            
            <h3>Notice of Entry</h3>
            <p>
              Landlords must provide tenants with proper notice before entering the rental property. This document should include:
            </p>
            <ul>
              <li>Date and time of intended entry</li>
              <li>Reason for entry</li>
              <li>Expected duration</li>
            </ul>
            
            <h3>Rent Increase Notice</h3>
            <p>
              In Kenya, landlords must provide proper notice before increasing rent. This document should specify:
            </p>
            <ul>
              <li>Current rent amount</li>
              <li>New rent amount</li>
              <li>Effective date of increase</li>
              <li>Reference to relevant lease terms</li>
            </ul>
            
            <div className="bg-yellow-50 p-4 rounded-md mt-6">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1 mr-2" />
                <div>
                  <h4 className="font-medium text-yellow-800">Important Notice</h4>
                  <p className="text-yellow-700">
                    These documents are general templates and may need to be customized to comply with local laws. 
                    We recommend consulting with a legal professional before finalizing any rental agreements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "tenant-tips": {
      title: "Tenant Tips",
      description: "Helpful advice for tenants to have a smooth rental experience",
      icon: <LightbulbIcon className="h-6 w-6 text-brand-500" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Essential Tips for Tenants</h2>
          
          <div className="prose max-w-none">
            <h3>Before You Move In</h3>
            <ul>
              <li>Take detailed photos of the property's condition to document any existing damage</li>
              <li>Test all appliances, plumbing, and electrical outlets</li>
              <li>Change the locks if permitted (with landlord approval)</li>
              <li>Locate all utilities and know how to shut them off in case of emergency</li>
              <li>Meet your neighbors and familiarize yourself with building rules</li>
            </ul>
            
            <h3>Managing Your Tenancy</h3>
            <ul>
              <li>Set up automatic rent payments to avoid late fees</li>
              <li>Create a system for reporting maintenance issues promptly</li>
              <li>Build a good relationship with your landlord through clear communication</li>
              <li>Keep copies of all communications and requests</li>
              <li>Consider renter's insurance to protect your possessions</li>
            </ul>
            
            <h3>Dealing with Maintenance Issues</h3>
            <p>
              When problems arise in your rental:
            </p>
            <ol>
              <li>Report issues immediately to prevent further damage</li>
              <li>Submit maintenance requests in writing and keep copies</li>
              <li>Follow up if repairs aren't made in a reasonable timeframe</li>
              <li>Document all communication and the condition before and after repairs</li>
              <li>Know your rights regarding essential services and habitability</li>
            </ol>
            
            <h3>Being a Good Neighbor</h3>
            <ul>
              <li>Be mindful of noise levels, especially during evening hours</li>
              <li>Follow building rules regarding common areas</li>
              <li>Properly dispose of trash and recycling</li>
              <li>Report security concerns to building management</li>
              <li>Participate in community events when possible</li>
            </ul>
            
            <h3>Preparing for Move-Out</h3>
            <ul>
              <li>Give proper notice according to your lease agreement</li>
              <li>Schedule a pre-move-out inspection with your landlord</li>
              <li>Clean thoroughly and repair any damage you've caused</li>
              <li>Return all keys and access devices</li>
              <li>Provide a forwarding address for security deposit return</li>
              <li>Take detailed photos of the final condition</li>
            </ul>
            
            <div className="bg-green-50 p-4 rounded-md mt-6">
              <div className="flex">
                <LightbulbIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1 mr-2" />
                <div>
                  <h4 className="font-medium text-green-800">Pro Tip</h4>
                  <p className="text-green-700">
                    Create a rental binder containing your lease, important contacts, maintenance requests, 
                    and payment records. Having everything in one place makes managing your tenancy much easier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "faqs": {
      title: "Frequently Asked Questions",
      description: "Common questions about renting in Kenya",
      icon: <HelpCircle className="h-6 w-6 text-brand-500" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="divide-y">
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">What documents do I need to rent a property?</h3>
                  <p className="text-gray-700">
                    Typically, you'll need identification (ID card or passport), proof of income (pay stubs or bank statements), 
                    references from previous landlords, and sometimes a guarantor. Some landlords also request credit checks.
                  </p>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">How much is a typical security deposit?</h3>
                  <p className="text-gray-700">
                    In Kenya, security deposits typically range from one to three months' rent. This amount should be clearly 
                    stated in your lease agreement, along with the conditions for its return.
                  </p>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">What should I check during a property viewing?</h3>
                  <p className="text-gray-700">
                    Check for signs of dampness or mold, test all plumbing fixtures, inspect appliances, check window and door security, 
                    look at mobile network coverage, inquire about internet options, check water pressure, and visit at different times of 
                    day to assess noise levels and natural light.
                  </p>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">Can a landlord increase my rent?</h3>
                  <p className="text-gray-700">
                    Yes, but they must provide proper notice, typically 30-90 days depending on your lease agreement. Rent increases 
                    should be reasonable and in line with market rates. Check your lease for specific terms regarding rent increases.
                  </p>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">Who is responsible for repairs?</h3>
                  <p className="text-gray-700">
                    Generally, landlords are responsible for major repairs and maintaining the structural integrity of the property. 
                    Tenants are typically responsible for minor repairs and damage they cause. Your lease should specify these responsibilities.
                  </p>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">Can I sublet my rental property?</h3>
                  <p className="text-gray-700">
                    This depends on your lease agreement. Many leases prohibit subletting without explicit landlord permission. 
                    Always get written permission before subletting to avoid potential eviction.
                  </p>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">What notice period do I need to give before moving out?</h3>
                  <p className="text-gray-700">
                    Typically, tenants need to provide one month's notice before vacating, but this can vary based on your lease 
                    agreement. Always provide notice in writing and keep a copy for your records.
                  </p>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">When should I get my security deposit back?</h3>
                  <p className="text-gray-700">
                    Landlords in Kenya generally have 14-30 days after the end of your tenancy to return your security deposit, 
                    less any valid deductions for damages beyond normal wear and tear.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1 mr-2" />
                <div>
                  <h4 className="font-medium text-blue-800">Still have questions?</h4>
                  <p className="text-blue-700">
                    If you can't find the answer to your question, feel free to 
                    <Link to="/contact" className="text-blue-700 font-medium mx-1 hover:underline">
                      contact our support team
                    </Link>
                    for personalized assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "market-trends": {
      title: "Market Trends",
      description: "Current real estate market trends and forecasts in Kenya",
      icon: <CalendarClock className="h-6 w-6 text-brand-500" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Kenya Real Estate Market Trends</h2>
          
          <div className="prose max-w-none">
            <h3>Current Market Overview (2023-2024)</h3>
            <p>
              Kenya's real estate market continues to show resilience despite economic challenges. Key trends include:
            </p>
            <ul>
              <li>Steady increase in property prices in major urban centers</li>
              <li>Growing demand for affordable housing</li>
              <li>Expansion of real estate development into satellite towns</li>
              <li>Increasing interest in mixed-use developments</li>
              <li>Adoption of green building practices</li>
            </ul>
            
            <h3>Regional Market Insights</h3>
            
            <h4>Nairobi Metropolitan Area</h4>
            <p>
              Nairobi continues to be Kenya's primary real estate hub with:
            </p>
            <ul>
              <li>Average residential rental yields of 4.5-6%</li>
              <li>Highest demand in Kilimani, Westlands, and Kileleshwa</li>
              <li>Growing interest in Athi River and Kitengela for affordable housing</li>
              <li>Increasing development of serviced apartments for expatriates</li>
            </ul>
            
            <h4>Coastal Region</h4>
            <p>
              The coastal market, particularly Mombasa, Diani, and Malindi, shows:
            </p>
            <ul>
              <li>Strong demand for holiday homes and vacation rentals</li>
              <li>Growing interest from international investors</li>
              <li>Development of luxury beachfront properties</li>
              <li>Average yields of 5-7% for short-term rentals</li>
            </ul>
            
            <h4>Western Kenya</h4>
            <p>
              Cities like Kisumu and Eldoret are experiencing:
            </p>
            <ul>
              <li>Increased development of modern residential estates</li>
              <li>Growing demand for middle-income housing</li>
              <li>Expansion of commercial real estate in city centers</li>
              <li>Improved infrastructure driving property value growth</li>
            </ul>
            
            <h3>Rental Market Trends</h3>
            <p>
              The rental market continues to evolve with:
            </p>
            <ul>
              <li>Increasing preference for furnished and semi-furnished units</li>
              <li>Growing demand for flexible lease terms</li>
              <li>Rising importance of amenities like high-speed internet, security, and backup power</li>
              <li>Shift toward online property searches and virtual viewings</li>
              <li>Growing adoption of property management software</li>
            </ul>
            
            <h3>Future Outlook</h3>
            <p>
              Looking ahead, experts predict:
            </p>
            <ul>
              <li>Continued growth in affordable housing developments</li>
              <li>Increased adoption of sustainable building practices</li>
              <li>Further digitalization of property transactions</li>
              <li>Expansion of mortgage accessibility through government initiatives</li>
              <li>Growing interest in co-living and shared housing models</li>
            </ul>
            
            <div className="bg-purple-50 p-4 rounded-md mt-6">
              <div className="flex">
                <CalendarClock className="h-5 w-5 text-purple-500 flex-shrink-0 mt-1 mr-2" />
                <div>
                  <h4 className="font-medium text-purple-800">Market Report</h4>
                  <p className="text-purple-700">
                    This information is based on our latest market research. We update our market trends 
                    quarterly to provide you with the most current information for making informed rental decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };
  
  // If category is not valid, redirect to rental-guides
  if (category && !resourceContents[category]) {
    return <Navigate to="/resources/rental-guides" />;
  }
  
  const currentResource = resourceContents[activeTab];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Resources & Guides</h1>
          <p className="text-gray-600 mt-2">
            Helpful information and resources for landlords and tenants
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="mb-6 overflow-x-auto">
            <TabsList className="w-full md:w-auto">
              {Object.entries(resourceContents).map(([key, resource]) => (
                <TabsTrigger key={key} value={key} className="flex items-center min-w-[140px]">
                  <span className="mr-2">{resource.icon}</span>
                  <span>{resource.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {Object.entries(resourceContents).map(([key, resource]) => (
            <TabsContent key={key} value={key} className="bg-white rounded-lg shadow p-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-4">
                  {resource.icon}
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold">{resource.title}</h2>
                    <p className="text-gray-600">{resource.description}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  {resource.content}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-medium mb-3">Was this information helpful?</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => toast({ title: "Thank you for your feedback!" })}>
                      Yes, very helpful
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate("/contact")}>
                      I need more help
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Need Personal Assistance?</CardTitle>
              <CardDescription>Our team is ready to help with your questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                If you need specific guidance about renting or listing a property, our specialists are available to assist you.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ready to Find Your Next Home?</CardTitle>
              <CardDescription>Browse our latest property listings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Explore available properties in your preferred location with our comprehensive search tools.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/properties">
                <Button>Browse Properties</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Are You a Property Owner?</CardTitle>
              <CardDescription>List your property with us</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Reach qualified tenants and manage your rental property efficiently with our landlord services.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/landlord/add-property">
                <Button>List Your Property</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResourcePages;
