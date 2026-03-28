import { Schema, models, model, Document, Types } from "mongoose";

export interface IJob {
    title: string;
    description: string;
    company: string;
    location: string;
    type: "fulltime" | "parttime" | "contract" | "internship";
    salary?: string;
    applyLink: string;
    tags: string[];
    author: Types.ObjectId;
}

export interface IJobDoc extends IJob, Document {}

const JobSchema = new Schema<IJob>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        type: {
            type: String,
            enum: ["fulltime", "parttime", "contract", "internship"],
            required: true,
        },
        salary: { type: String },
        applyLink: { type: String, required: true },
        tags: [{ type: String }],
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Job = models?.Job || model<IJob>("Job", JobSchema);

export default Job;
