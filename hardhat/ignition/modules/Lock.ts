const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const HackReviewModule = buildModule("HackReview", (m: any) => {
  const hackReview = m.contract("HackReview");

  return { hackReview };
});

export default HackReviewModule;
