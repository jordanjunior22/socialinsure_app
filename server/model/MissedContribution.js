const mongoose = require("mongoose");
const { models,model, Schema } = mongoose;

const missedContributionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = models?.MissedContribution || model("MissedContribution", missedContributionSchema);
