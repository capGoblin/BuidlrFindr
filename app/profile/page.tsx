"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  MapPin,
  Link,
  CheckCircle2,
  Calendar,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

// Dummy data
const profileData = {
  passport: {
    activity_score: 75,
    identity_score: 90,
    skills_score: 85,
    calculating_score: false,
    human_checkmark: true,
    last_calculated_at: "2024-10-13T07:18:15.602Z",
    main_wallet: "0x1234...5678",
    score: 83,
    passport_profile: {
      bio: "Passionate blockchain developer and hackathon enthusiast",
      display_name: "CryptoDevAlice",
      location: "San Francisco, CA",
      tags: ["Blockchain", "Solidity", "React", "Web3"],
    },
    verified_wallets: ["0x1234...5678", "0x9876...5432"],
    merged: true,
    passport_socials: [
      {
        follower_count: "5.2K",
        following_count: "1.3K",
        location: "San Francisco, CA",
        profile_bio: "Building the decentralized future",
        profile_display_name: "Alice | Web3 Dev",
        profile_image_url: "/api/placeholder/150/150",
        profile_name: "alice_web3",
        profile_url: "https://lens.xyz/alice_web3",
        source: "lens",
      },
    ],
  },
};

// Dummy reviews data
const reviews = [
  {
    id: 1,
    reviewer: "Bob",
    hackathon: "ETHGlobal 2024",
    rating: 5,
    comment:
      "Alice was an incredible teammate. Her Solidity skills are top-notch, and she's great at explaining complex concepts.",
    technologies: ["Solidity", "Ethereum", "React", "Web3.js"],
    date: "2024-03-15",
  },
  {
    id: 2,
    reviewer: "Carol",
    hackathon: "Polygon Hackathon",
    rating: 4,
    comment:
      "Very knowledgeable about blockchain tech. Could improve on time management, but overall a great collaborator.",
    technologies: ["Polygon", "JavaScript", "Node.js", "IPFS"],
    date: "2024-02-20",
  },
  {
    id: 3,
    reviewer: "Carol",
    hackathon: "Polygon Hackathon",
    rating: 4,
    comment:
      "Very knowledgeable about blockchain tech. Could improve on time management, but overall a great collaborator.",
    technologies: ["Polygon", "JavaScript", "Node.js", "IPFS"],
    date: "2024-02-20",
  },
  {
    id: 4,
    reviewer: "Carol",
    hackathon: "Polygon Hackathon",
    rating: 4,
    comment:
      "Very knowledgeable about blockchain tech. Could improve on time management, but overall a great collaborator.",
    technologies: ["Polygon", "JavaScript", "Node.js", "IPFS"],
    date: "2024-02-20",
  },
  {
    id: 5,
    reviewer: "Carol",
    hackathon: "Polygon Hackathon",
    rating: 4,
    comment:
      "Very knowledgeable about blockchain tech. Could improve on time management, but overall a great collaborator.",
    technologies: ["Polygon", "JavaScript", "Node.js", "IPFS"],
    date: "2024-02-20",
  },
];

const UserProfilePage = () => {
  const { passport } = profileData;
  const { passport_profile, passport_socials } = passport;
  const [techFilters, setTechFilters] = useState<string[]>([]);

  const filteredReviews = reviews.filter(
    (review) =>
      techFilters.length === 0 ||
      techFilters.every((filter) =>
        review.technologies.some((tech) =>
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-20 shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-4 rounded-full border-4 border-blue-500 shadow-lg">
                    <AvatarImage
                      src={passport_socials[0].profile_image_url}
                      alt={passport_profile.display_name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl">
                      {passport_profile.display_name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
                    {passport_profile.display_name}
                    {passport.human_checkmark && (
                      <CheckCircle2 className="inline-block ml-2 h-5 w-5 text-green-500" />
                    )}
                  </h1>
                  <p className="text-gray-600 mb-3 flex items-center justify-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {passport_profile.location}
                  </p>
                  <p className="text-gray-700 mb-4 text-center">
                    {passport_profile.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {passport_profile.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-20 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
                <CardTitle className="text-white text-xl">
                  Talent Passport Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {[
                    { label: "Activity Score", value: passport.activity_score },
                    { label: "Identity Score", value: passport.identity_score },
                    { label: "Skills Score", value: passport.skills_score },
                    { label: "Overall Score", value: passport.score },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {item.value}%
                        </span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-white text-2xl mb-4">
                  On-Chain Hackathon Reviews
                </CardTitle>
                <div className="relative">
                  <div className="mb-3">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="text"
                        placeholder="Search reviews by technology (e.g., React, Solidity)..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const newFilter = e.currentTarget.value.trim();
                            if (newFilter && !techFilters.includes(newFilter)) {
                              setTechFilters([...techFilters, newFilter]);
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                        className="pl-10 pr-4 py-2 w-full bg-white bg-opacity-80 backdrop-blur-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      />
                    </div>
                    {techFilters.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {techFilters.map((filter, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full"
                          >
                            {filter}
                            <button
                              onClick={() =>
                                setTechFilters(
                                  techFilters.filter((f) => f !== filter)
                                )
                              }
                              className="ml-2 focus:outline-none"
                            >
                              &times;
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <ScrollArea className="h-[68vh] pr-4">
                  {filteredReviews.map((review) => (
                    <div
                      key={review.id}
                      className="mb-4 last:mb-0 p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {review.hackathon}
                          </h3>
                          <p className="text-sm text-gray-200 flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-100 mb-2">
                        {review.comment}
                      </p>
                      <div className="flex items-center flex-wrap gap-1 mb-2">
                        <span className="text-xs font-semibold text-gray-200">
                          Technologies:
                        </span>
                        {review.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-white bg-opacity-20 text-white px-2 py-0.5 text-xs rounded-full"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-200">
                        <strong>Reviewer:</strong> {review.reviewer}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
