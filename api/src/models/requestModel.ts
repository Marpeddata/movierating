import mongoose from "mongoose";
import { Request } from "../types";

const requestSchema = new mongoose.Schema<Request>(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },

  { collection: "requests" }
);

const requestModel = mongoose.model<Request>("Request", requestSchema);

export default requestModel;
