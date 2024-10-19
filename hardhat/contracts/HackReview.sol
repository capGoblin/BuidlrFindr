// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract HackReview {

    // Define the structure of a review
    struct Review {
        address reviewer;        // The wallet address of the reviewer
        address reviewee;        // The wallet address of the reviewee
        string hackathonName;    // Name of the hackathon
        string reviewText;       // Review content
        uint8 starRating;        // Star rating out of 5
        string[] technologies;   // List of technologies used
    }

    // Mapping to store reviews of a user (wallet address) => (array of reviews)
    mapping(address => Review[]) public userReviews;

    // Array to keep track of all reviews
    Review[] public allReviews;

    // Event emitted when a new review is created
    event ReviewSubmitted(
        address indexed reviewer,
        address indexed reviewee,
        string hackathonName,
        uint8 starRating,
        string[] technologies
    );

    // Function to submit a review
    function submitReview(
        address _reviewee,
        string memory _hackathonName,
        string memory _reviewText,
        uint8 _starRating,
        string[] memory _technologies
    ) public {
        require(_reviewee != msg.sender, "You cannot review yourself.");
        require(_starRating >= 1 && _starRating <= 5, "Rating must be between 1 and 5.");

        // Create the review
        Review memory newReview = Review({
            reviewer: msg.sender,
            reviewee: _reviewee,
            hackathonName: _hackathonName,
            reviewText: _reviewText,
            starRating: _starRating,
            technologies: _technologies
        });

        // Add the review to the reviewee's list of reviews
        userReviews[_reviewee].push(newReview);

        // Add the review to the global list of all reviews
        allReviews.push(newReview);

        // Emit the event for the new review
        emit ReviewSubmitted(msg.sender, _reviewee, _hackathonName, _starRating, _technologies);
    }

    // Function to get the reviews of a specific user
    function getUserReviews(address _user) public view returns (Review[] memory) {
        return userReviews[_user];
    }

    // Function to get all reviews ever submitted
    function getAllReviews() public view returns (Review[] memory) {
        return allReviews;
    }

    // Function to search reviews by technology
    function searchReviewsByTech(string memory _tech) public view returns (Review[] memory) {
        Review[] memory matchingReviews = new Review[](allReviews.length);
        uint256 count = 0;

        for (uint256 i = 0; i < allReviews.length; i++) {
            // Check if the technology exists in the review's technologies
            for (uint256 j = 0; j < allReviews[i].technologies.length; j++) {
                if (keccak256(abi.encodePacked(allReviews[i].technologies[j])) == keccak256(abi.encodePacked(_tech))) {
                    matchingReviews[count] = allReviews[i];
                    count++;
                    break; // No need to check more technologies in this review
                }
            }
        }

        // Resize the array to fit the number of matching reviews
        Review[] memory result = new Review[](count);
        for (uint256 k = 0; k < count; k++) {
            result[k] = matchingReviews[k];
        }

        return result;
    }
}
