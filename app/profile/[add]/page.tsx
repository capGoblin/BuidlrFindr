"use client";

import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { abi } from "@/hardhat/artifacts/contracts/HackReview.sol/HackReview.json";
import { cn } from "@/lib/utils";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { Contract, ethers } from "ethers";
import { Calendar, CheckCircle2, MapPin, Search, Star } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// Define an interface for the review structure
interface NewReview {
  hackName: string;
  review: string;
  rating: number;
  technologies: string[];
  projectUrl: string; // Add this line
}

interface PassportData {
  activity_score: number;
  identity_score: number;
  skills_score: number;
  calculating_score: boolean;
  human_checkmark: boolean;
  last_calculated_at: string;
  main_wallet: string;
  score: number;
  passport_profile: {
    bio: string;
    display_name: string;
    location: string;
    tags: string[];
  };
  verified_wallets: string[];
  merged: boolean;
  passport_socials: {
    follower_count: string;
    following_count: string;
    location: string;
    profile_bio: string;
    profile_display_name: string;
    profile_image_url: string;
    profile_name: string;
    profile_url: string;
    source: string;
  }[];
}

interface UserProfilePageProps {
  params: {
    add: string;
  };
}

interface Review {
  id: number;
  reviewer: string;
  hackathon: string;
  rating: number;
  comment: string;
  technologies: string[];
  date: string;
  projectUrl: string; // Add this line
}

interface ContractReview {
  reviewer: string;
  hackathonName: string;
  starRating: number;
  reviewText: string;
  technologies: string[];
  projectUrl: string;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ params }) => {
  // Dummy reviews data
  const dummyReviews = [
    {
      id: 1,
      reviewer: "Bob",
      hackathon: "ETHGlobal 2024",
      rating: 5,
      comment:
        "Alice was an incredible teammate. Her Solidity skills are top-notch, and she's great at explaining complex concepts.",
      technologies: ["Solidity", "Ethereum", "React", "Web3.js"],
      date: "2024-03-15",
      projectUrl: "https://example.com/project1",
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
      projectUrl: "https://example.com/project2",
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
      projectUrl: "https://example.com/project3",
    },
  ];

  const [profileData, setProfileData] = useState<PassportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [techFilters, setTechFilters] = useState<string[]>([]);
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReview, setNewReview] = useState<NewReview>({
    hackName: "",
    review: "",
    rating: 0,
    technologies: [],
    projectUrl: "",
  });
  const [reviews, setReviews] = useState<Review[]>([...dummyReviews]);

  const getReviews = useCallback(async () => {
    if (!isConnected || !walletProvider) {
      console.log("Wallet not connected");
      toast("Please connect your wallet to view reviews", {
        action: {
          label: "Connect Wallet",
          onClick: () => open(),
        },
      });
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(walletProvider, "any");
      const signer = await provider.getSigner();
      const contract = new Contract(
        "0xEcAb28dFa5350b9BBC79256C87BD76928590674E",
        abi,
        signer
      );

      const res: ContractReview[] = await contract.getUserReviews(params.add);
      console.log("Reviews fetched", res);

      const fetchedReviews = res.map(
        (review: ContractReview, index: number) => ({
          id: reviews.length + index + 1,
          reviewer: review.reviewer,
          hackathon: review.hackathonName,
          rating: review.starRating,
          comment: review.reviewText,
          technologies: review.technologies,
          date: new Date().toISOString(),
          projectUrl: review.projectUrl,
        })
      );

      setReviews((prevReviews) => [...prevReviews, ...fetchedReviews]);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast("Error fetching reviews", {
        description: "Please try again later.",
      });
    }
  }, [isConnected, walletProvider, open, params.add, reviews.length]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (params.add) {
        try {
          const response = await fetch(
            `https://api.talentprotocol.com/api/v2/passports/${params.add}`,
            {
              method: "GET",
              headers: {
                "X-API-KEY":
                  "5e8f47a2f81c1c7f9801c7364adfe19ea21d9f1d602229feb065dde288a1",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
          const data = await response.json();
          setProfileData(data.passport);
        } catch (err) {
          setError("Error fetching profile data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
    if (isConnected) {
      getReviews();
    }
  }, [params.add, isConnected, getReviews]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !profileData) {
    return <div>Error: {error || "Profile data not available"}</div>;
  }

  const { passport_profile, passport_socials } = profileData;

  async function writeReview(
    hackName: string,
    review: string,
    rating: number,
    technologies: string[],
    projectUrl: string // Add this parameter
  ) {
    if (!isConnected) throw Error("User disconnected");

    const provider = new ethers.providers.Web3Provider(walletProvider!, "any");

    // const ethersProvider = new BrowserProvider(walletProvider!);
    const signer = await provider.getSigner();

    const contract = new Contract(
      "0xbe2e297a2F5Ef3273773e1d9b47C53DFe44F1b34",
      abi,
      signer
    );

    const res = await contract.submitReview(
      params.add,
      hackName,
      review,
      rating,
      technologies,
      projectUrl // Add this argument
    );
    console.log("Review submitted", res);
  }

  const handleWriteReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeReview(
        newReview.hackName,
        newReview.review,
        newReview.rating,
        newReview.technologies,
        newReview.projectUrl // Add this argument
      );
      toast("Review submitted successfully!", {
        description: "Your review has been added to the blockchain.",
      });
      setIsWriteReviewOpen(false);
      getReviews(); // Refresh the reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      toast("Error submitting review", {
        description: "Please try again later.",
        action: {
          label: "Retry",
          onClick: () => handleWriteReview(e),
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-20 shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-4 rounded-full border-4 border-blue-500 shadow-lg">
                    <AvatarImage
                      src={passport_socials[0]?.profile_image_url || ""}
                      alt={passport_profile.display_name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl">
                      {passport_profile.display_name
                        ? passport_profile.display_name
                            .slice(0, 2)
                            .toUpperCase()
                        : params.add.slice(0, 6)}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
                    {passport_profile.display_name ||
                      `${params.add.slice(0, 10)}...`}
                    {profileData.human_checkmark && (
                      <CheckCircle2 className="inline-block ml-2 h-5 w-5 text-green-500" />
                    )}
                  </h1>
                  <p className="text-gray-600 mb-3 flex items-center justify-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {passport_profile.location || "Location not specified"}
                  </p>
                  <p className="text-gray-700 mb-4 text-center">
                    {passport_profile.bio || "No bio available"}
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
                    {
                      label: "Activity Score",
                      value: profileData.activity_score,
                    },
                    {
                      label: "Identity Score",
                      value: profileData.identity_score,
                    },
                    { label: "Skills Score", value: profileData.skills_score },
                    { label: "Overall Score", value: profileData.score },
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
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-2xl mb-4">
                    On-Chain Hackathon Reviews
                  </CardTitle>
                  <Dialog
                    open={isWriteReviewOpen}
                    onOpenChange={setIsWriteReviewOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="secondary">Write a Review</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleWriteReview} className="space-y-4">
                        <div>
                          <Label htmlFor="hackName">Hackathon Name</Label>
                          <Input
                            id="hackName"
                            value={newReview.hackName}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                hackName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="review">Review</Label>
                          <Textarea
                            id="review"
                            value={newReview.review}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                review: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="rating">Rating (1-5)</Label>
                          <Input
                            id="rating"
                            type="number"
                            min="1"
                            max="5"
                            value={newReview.rating}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                rating: parseInt(e.target.value),
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="technologies">
                            Technologies (comma-separated)
                          </Label>
                          <Input
                            id="technologies"
                            value={newReview.technologies.join(", ")}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                technologies: e.target.value
                                  .split(",")
                                  .map((t) => t.trim()),
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="projectUrl">Project URL</Label>
                          <Input
                            id="projectUrl"
                            value={newReview.projectUrl}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                projectUrl: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <Button type="submit">Submit Review</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
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
                <ScrollArea className="h-[400px] pr-4">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 bg-white bg-opacity-10 rounded-lg shadow-md"
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
                      {review.projectUrl && (
                        <p className="text-sm text-gray-200 mb-2">
                          <strong>Project URL:</strong>{" "}
                          <a
                            href={review.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 underline"
                          >
                            {review.projectUrl}
                          </a>
                        </p>
                      )}
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
