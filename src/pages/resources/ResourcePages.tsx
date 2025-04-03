import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bookmark, 
  Download, 
  FileText, 
  Share2, 
  ThumbsUp, 
  Calendar, 
  User, 
  ChevronRight,
  Home,
  Building,
  Shield,
  ScrollText,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const resourcesData = {
  "rental-guides": {
    title: "Rental Guides",
    description: "Comprehensive guides to help you navigate the rental process in Kenya.",
    articles: [
      {
        id: "guide-1",
        title: "Tenant's Guide to Renting in Nairobi",
        content: "A detailed guide for tenants looking to rent property in Nairobi. Includes tips on finding the right property, negotiating rent, and understanding your rights.",
        date: "2024-01-15",
        author: "Alice Johnson",
        category: "rental-guides",
      },
      {
        id: "guide-2",
        title: "Landlord's Guide to Property Management",
        content: "Essential tips for landlords on managing their rental properties effectively. Covers tenant screening, rent collection, and property maintenance.",
        date: "2024-02-20",
        author: "Bob Williams",
        category: "rental-guides",
      },
      {
        id: "guide-3",
        title: "Understanding Your Rights as a Tenant in Kenya",
        content: "An overview of the legal rights and protections available to tenants in Kenya under the law.",
        date: "2024-03-10",
        author: "Catherine Davis",
        category: "rental-guides",
      },
      {
        id: "guide-4",
        title: "How to Find the Perfect Rental Property",
        content: "Practical advice on how to search for and secure the ideal rental property that meets your needs and budget.",
        date: "2024-04-05",
        author: "David Miller",
        category: "rental-guides",
      },
      {
        id: "guide-5",
        title: "Negotiating Rent: Tips and Strategies",
        content: "Strategies for negotiating rent with landlords to get the best possible deal on your rental property.",
        date: "2024-05-12",
        author: "Eve Thompson",
        category: "rental-guides",
      },
    ],
  },
  "market-reports": {
    title: "Property Market Reports",
    description: "Quarterly analysis of property trends and pricing across major Kenyan cities.",
    articles: [
      {
        id: "report-1",
        title: "Nairobi Property Market Report Q1 2024",
        content: "Analysis of property prices, rental yields, and market trends in Nairobi for the first quarter of 2024.",
        date: "2024-04-01",
        author: "Market Analyst",
        category: "market-reports",
      },
      {
        id: "report-2",
        title: "Mombasa Property Market Report Q1 2024",
        content: "Overview of the real estate market in Mombasa, including price movements and investment opportunities.",
        date: "2024-04-01",
        author: "Market Analyst",
        category: "market-reports",
      },
    ],
  },
  "tenant-rights": {
    title: "Tenant Rights",
    description: "Learn about your legal rights and protections as a tenant in Kenya.",
    articles: [
      {
        id: "rights-1",
        title: "Your Rights as a Tenant",
        content: "Detailed information on tenant rights, including lease agreements, eviction procedures, and dispute resolution.",
        date: "2024-01-01",
        author: "Legal Expert",
        category: "tenant-rights",
      },
    ],
  },
  "landlord-tips": {
    title: "Landlord Tips",
    description: "Best practices for property management and tenant relations.",
    articles: [
      {
        id: "tips-1",
        title: "Effective Property Management",
        content: "Tips for landlords on how to manage their properties effectively, including tenant screening, rent collection, and maintenance.",
        date: "2024-01-01",
        author: "Property Manager",
        category: "landlord-tips",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description: "How we protect and handle your personal information.",
    articles: [
      {
        id: "privacy-1",
        title: "Our Privacy Policy",
        content: "Detailed information on how we collect, use, and protect your personal information.",
        date: "2024-01-01",
        author: "Legal Team",
        category: "privacy-policy",
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    description: "Rules and guidelines for using our platform.",
    articles: [
      {
        id: "terms-1",
        title: "Our Terms of Service",
        content: "Detailed information on the rules and guidelines for using our platform.",
        date: "2024-01-01",
        author: "Legal Team",
        category: "terms-of-service",
      },
    ],
  },
};

const ResourcePages = () => {
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState(category || "rental-guides");
  const { toast } = useToast();
  const [currentCategoryData, setCurrentCategoryData] = useState(resourcesData["rental-guides"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (category && resourcesData[category]) {
      setCurrentCategoryData(resourcesData[category]);
      setActiveTab(category);
    } else {
      setCurrentCategoryData(resourcesData["rental-guides"]);
      setActiveTab("rental-guides");
    }
  }, [category]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "RentConnect Resources",
        text: "Check out these helpful rental resources!",
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Link Copied!",
        description: "The link has been copied to your clipboard.",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleReadMore = (articleId) => {
    toast({
      title: "Article Opened",
      description: "Loading the full article content...",
    });
    
    setTimeout(() => {
      toast({
        title: "Article Loaded",
        description: "You are now viewing the full article content.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <Link to="/" className="hover:text-brand-500 transition-colors">
              <Home className="h-4 w-4 inline-block mr-1 align-text-top" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 inline-block mx-1 align-text-top" />
            <span className="font-medium">Resources</span>
            {category && (
              <>
                <ChevronRight className="h-4 w-4 inline-block mx-1 align-text-top" />
                <span className="font-medium">{currentCategoryData.title}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold mt-2">{currentCategoryData.title}</h1>
          <p className="text-gray-600">{currentCategoryData.description}</p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          navigate(`/resources/${value}`);
        }}>
          <TabsList className="mb-4">
            {Object.entries(resourcesData).map(([key, resource]) => (
              <TabsTrigger key={key} value={key}>
                {resource.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(resourcesData).map(([key, resource]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              {resource.articles.map((article) => (
                <div key={article.id} className="bg-white rounded-md shadow-sm p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <User className="h-4 w-4 mx-2" />
                    <span>{article.author}</span>
                  </div>
                  <p className="text-gray-700">{article.content}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => {
                        toast({
                          title: "Article Saved",
                          description: "This article has been saved to your bookmarks.",
                        });
                      }}>
                        <Bookmark className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleReadMore(article.id)}>
                      <FileText className="h-4 w-4 mr-1" />
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default ResourcePages;
