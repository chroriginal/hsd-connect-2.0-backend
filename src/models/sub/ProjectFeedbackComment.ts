import mongoose from "mongoose";
import {
  schemaUtils,
  schemaValidator,
  schemaValidatorMessages
} from "../../utils/models/schemaUtils";

const projectFeedbackCommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  content: {
    type: mongoose.Schema.Types.String,
    required: [true, schemaValidatorMessages.isRequired("comment content")]
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  }
});

projectFeedbackCommentSchema.pre(
  "save",
  schemaValidator.validateLength("content", 5, 300)
);
projectFeedbackCommentSchema.pre(
  "save",
  schemaUtils.setPropertyDate("updatedAt")
);

export default projectFeedbackCommentSchema;
