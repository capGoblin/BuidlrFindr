import React from "react";
import Navbar from "@/components/Navbar";
import { Search, Users, Star, Award, Zap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl text-gray-700 font-extrabold mb-6 leading-tight">
            Forge Your <span className="text-blue-400">Dream Team</span> with
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              On-Chain Reviews
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed bg-clip-text">
            Empower your hackathon journey by finding collaborators with proven
            skills, filtered by the tech you need.
          </p>
        </header>

        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl overflow-hidden mb-12">
          <CardContent className="p-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={24}
                />
                <Input
                  type="text"
                  placeholder="Search for skills, hackathons, or teammates..."
                  className="pl-12 pr-4 py-6 w-full bg-white bg-opacity-90 backdrop-blur-sm border-2 border-white border-opacity-50 rounded-lg shadow-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 text-lg"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300">
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-3 bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-20 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
              <CardTitle className="text-white text-2xl">
                Why Choose Our Platform?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <Users className="mr-3 h-8 w-8 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Verified Profiles</h3>
                    <p className="text-sm">
                      Connect with teammates using Talent Protocol verified
                      profiles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="mr-3 h-8 w-8 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">On-Chain Reviews</h3>
                    <p className="text-sm">
                      Make informed decisions with transparent, on-chain
                      reviews.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="mr-3 h-8 w-8 text-purple-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Smart Matching</h3>
                    <p className="text-sm">
                      Our algorithm suggests teammates based on complementary
                      skills.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-20 shadow-xl overflow-hidden mb-8">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
                <CardTitle className="text-white text-2xl">
                  Featured Hackathons
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ScrollArea className="h-[300px] pr-4">
                  {[
                    {
                      name: "ETHGlobal 2024",
                      date: "Aug 15-17, 2024",
                      participants: 1500,
                    },
                    {
                      name: "Polygon Hackathon",
                      date: "Sept 1-3, 2024",
                      participants: 1200,
                    },
                    {
                      name: "Base Chain Buildathon",
                      date: "Oct 5-7, 2024",
                      participants: 800,
                    },
                    {
                      name: "Solana Summer Hack",
                      date: "July 10-12, 2024",
                      participants: 1000,
                    },
                    {
                      name: "Chainlink Hackathon",
                      date: "Nov 8-10, 2024",
                      participants: 950,
                    },
                  ].map((hackathon, index) => (
                    <div
                      key={index}
                      className="mb-4 last:mb-0 p-4 bg-white bg-opacity-60 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {hackathon.name}
                      </h3>
                      <p className="text-sm text-gray-600">{hackathon.date}</p>
                      <p className="text-sm text-gray-700">
                        {hackathon.participants} participants
                      </p>
                      <Button className="mt-2" variant="outline">
                        Find Teammates
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-20 shadow-xl overflow-hidden mb-8">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
                <CardTitle className="text-white text-2xl">
                  Top Rated Developers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ScrollArea className="h-[300px] pr-4">
                  {[
                    { name: "Alice", skill: "Solidity", rating: 4.9 },
                    { name: "Bob", skill: "React", rating: 4.8 },
                    { name: "Carol", skill: "Smart Contracts", rating: 4.7 },
                    { name: "Dave", skill: "UI/UX", rating: 4.6 },
                    {
                      name: "Eve",
                      skill: "Blockchain Architecture",
                      rating: 4.8,
                    },
                  ].map((dev, index) => (
                    <div
                      key={index}
                      className="mb-4 last:mb-0 p-4 bg-white bg-opacity-60 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-3 flex items-center justify-center text-white font-bold">
                          {dev.name[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold">{dev.name}</h3>
                          <p className="text-sm text-gray-600">{dev.skill}</p>
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">{dev.rating}</span>
                      </div>
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
}
