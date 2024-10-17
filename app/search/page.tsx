"use client";

import React, { useState, useEffect } from "react";
import { Search, Star, Filter, User, X } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dummy data for search results
const searchResults = [
  {
    id: 1,
    hackathon: "ETHGlobal 2023",
    project: "DeFi Yield Optimizer",
    rating: 5,
    review:
      "Implemented complex smart contracts for our DeFi project. Their Solidity skills are exceptional, especially in optimizing gas usage and implementing advanced yield farming strategies. They also showed great teamwork and communication skills throughout the hackathon.",
    skills: ["Solidity", "DeFi", "Smart Contracts"],
    author: {
      name: "John Doe",
      avatar: "/api/placeholder/150/150",
    },
    reviewee: {
      name: "Alice Johnson",
      avatar: "/api/placeholder/150/150",
    },
  },
  {
    id: 2,
    hackathon: "Polygon Hackathon",
    project: "NFT Marketplace",
    rating: 4,
    review:
      "Developed the smart contracts for our NFT marketplace. Their Solidity code was clean and well-structured. They implemented ERC721 and ERC1155 standards efficiently. Could improve on documentation, but overall a strong contributor to the project.",
    skills: ["Solidity", "NFTs", "ERC Standards"],
    author: {
      name: "Emma Wilson",
      avatar: "/api/placeholder/150/150",
    },
    reviewee: {
      name: "Bob Smith",
      avatar: "/api/placeholder/150/150",
    },
  },
  {
    id: 3,
    hackathon: "ETHDenver",
    project: "Zero-Knowledge Voting System",
    rating: 5,
    review:
      "Implemented complex zero-knowledge proofs in Solidity for our anonymous voting system. Their deep understanding of both ZK proofs and Solidity allowed us to create a truly innovative solution. Excellent problem-solving skills and ability to explain complex concepts to the team.",
    skills: ["Solidity", "Zero-Knowledge Proofs", "Cryptography"],
    author: {
      name: "Alex Chen",
      avatar: "/api/placeholder/150/150",
    },
    reviewee: {
      name: "Carol Martinez",
      avatar: "/api/placeholder/150/150",
    },
  },
];

const ReviewFocusedSearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [techFilters, setTechFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [filteredResults, setFilteredResults] = useState(searchResults);

  useEffect(() => {
    const filtered = searchResults.filter(
      (result) =>
        techFilters.length === 0 ||
        techFilters.every((filter) =>
          result.skills.some((skill) =>
            skill.toLowerCase().includes(filter.toLowerCase())
          )
        )
    );
    setFilteredResults(filtered);
  }, [techFilters]);

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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                        {result.hackathon}: {result.project}
                      </span>
                      <div className="flex">{renderStars(result.rating)}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{result.review}</p>
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
