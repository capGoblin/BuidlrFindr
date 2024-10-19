"use client";

import React, { useState, useEffect } from "react";
import { Search, Star, Filter, X, Link } from "lucide-react"; // Added Link icon
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Contract, ethers } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { abi } from "@/hardhat/artifacts/contracts/HackReview.sol/HackReview.json";
import { useSearchParams } from "next/navigation";

interface Review {
  id: number;
  hackathon: string;
  projectUrl: string; // Changed from project to projectUrl
  rating: number;
  review: string;
  skills: string[];
  author: {
    name: string;
    avatar: string;
  };
  reviewee: {
    name: string;
    avatar: string;
  };
}

interface ContractReview {
  reviewer: string;
  reviewee: string;
  hackathonName: string;
  reviewText: string;
  starRating: number;
  technologies: string[];
  projectUrl: string; // Added projectUrl
}

const ReviewFocusedSearchResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [techFilters, setTechFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [filteredResults, setFilteredResults] = useState<Review[]>([]);
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const searchParams = useSearchParams();

  useEffect(() => {
    const techs = searchParams.get("techs");
    if (techs) {
      setTechFilters(techs.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    if (isConnected && walletProvider && techFilters.length > 0) {
      fetchReviews();
    }
  }, [isConnected, walletProvider, techFilters]);

  const fetchReviews = async () => {
    if (!walletProvider) return;

    try {
      const provider = new ethers.providers.Web3Provider(walletProvider, "any");
      const signer = await provider.getSigner();
      const contract = new Contract(
        "0xbe2e297a2F5Ef3273773e1d9b47C53DFe44F1b34",
        abi,
        signer
      );

      let allReviews: ContractReview[] = [];
      for (const tech of techFilters) {
        const reviews: ContractReview[] = await contract.searchReviewsByTech(
          tech
        );
        allReviews = [...allReviews, ...reviews];
      }

      // Remove duplicates and format the reviews
      const uniqueReviews = Array.from(
        new Set(
          allReviews.map((r) => r.reviewer + r.reviewee + r.hackathonName)
        )
      ).map((key) => {
        return allReviews.find(
          (r) => r.reviewer + r.reviewee + r.hackathonName === key
        );
      });

      const formattedReviews: Review[] = uniqueReviews.map((review, index) => ({
        id: index + 1,
        hackathon: review!.hackathonName,
        projectUrl: review!.projectUrl, // Use projectUrl instead of project
        rating: review!.starRating,
        review: review!.reviewText,
        skills: review!.technologies,
        author: {
          name: review!.reviewer,
          avatar: "/api/placeholder/150/150",
        },
        reviewee: {
          name: review!.reviewee,
          avatar: "/api/placeholder/150/150",
        },
      }));

      setFilteredResults(formattedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newFilter = e.currentTarget.value.trim();
      if (newFilter && !techFilters.includes(newFilter)) {
        setTechFilters([...techFilters, newFilter]);
        setSearchQuery("");
      }
    }
  };

  const removeFilter = (filter: string) => {
    setTechFilters(techFilters.filter((f) => f !== filter));
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-20 shadow-xl overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
            <CardTitle className="text-white text-2xl">
              Review Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <div className="flex-grow mr-4 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search for skills, technologies..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  onKeyPress={handleSearch}
                  className="pl-10 pr-4 py-2 w-full bg-white bg-opacity-80 backdrop-blur-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>

            {techFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {techFilters.map((filter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white bg-opacity-20 text-gray-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="ml-2 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredResults.length} reviews found
              </p>
              <div className="flex items-center">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-white bg-opacity-80 backdrop-blur-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="ml-4">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[600px] pr-4">
              {filteredResults.map((result) => (
                <Card
                  key={result.id}
                  className="mb-6 bg-white bg-opacity-60 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">
                        {result.hackathon}
                      </span>
                      <div className="flex">{renderStars(result.rating)}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{result.review}</p>
                    {result.projectUrl && (
                      <p className="text-sm text-gray-600 mb-4 flex items-center">
                        <Link className="mr-2 h-4 w-4" />
                        <a
                          href={result.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 underline"
                        >
                          Project URL: {result.projectUrl}
                        </a>
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-0.5 text-xs rounded-full"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text-sm text-gray-500 bg-gray-100 bg-opacity-50 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full border-2 border-blue-500"
                          src={result.reviewee.avatar}
                          alt={result.reviewee.name}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Developer
                        </p>
                        <p className="text-xs text-gray-500">
                          {result.reviewee.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 text-right">
                          Reviewer
                        </p>
                        <p className="text-xs text-gray-500 text-right">
                          {result.author.name}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full border-2 border-purple-500"
                          src={result.author.avatar}
                          alt={result.author.name}
                        />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewFocusedSearchResults;
