"use server";
import { Job } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { CreateJobSchema, GetJobSchema, PaginatedSearchParamsSchema } from "../validations";
import dbConnect from "../mongoose";

export async function createJob(params: CreateJobParams): Promise<ActionResponse<JobPost>> {
    const validationResult = await action({
        params,
        schema: CreateJobSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const userId = validationResult.session?.user?.id;

    try {
        const job = await Job.create({ ...validationResult.params, author: userId });
        return { success: true, data: JSON.parse(JSON.stringify(job)) };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}

export async function getJobs(
    params: PaginatedSearchParams
): Promise<ActionResponse<{ jobs: JobPost[]; isNext: boolean }>> {
    await dbConnect();

    const validationResult = await action({
        params,
        schema: PaginatedSearchParamsSchema,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { page = 1, pageSize = 10, query, filter } = params;
    const skip = (Number(page) - 1) * pageSize;
    const limit = Number(pageSize);

    const filterQuery: Record<string, unknown> = {};

    if (query) {
        filterQuery.$or = [
            { title: { $regex: query, $options: "i" } },
            { company: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
        ];
    }

    if (filter) {
        filterQuery.type = filter;
    }

    try {
        const total = await Job.countDocuments(filterQuery);
        const jobs = await Job.find(filterQuery)
            .populate("author", "name image")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return {
            success: true,
            data: {
                jobs: JSON.parse(JSON.stringify(jobs)),
                isNext: total > skip + jobs.length,
            },
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}

export async function getJob(params: GetJobParams): Promise<ActionResponse<JobPost>> {
    const validationResult = await action({
        params,
        schema: GetJobSchema,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { jobId } = validationResult.params!;

    try {
        const job = await Job.findById(jobId).populate("author", "name image");
        if (!job) throw new Error("Job not found");
        return { success: true, data: JSON.parse(JSON.stringify(job)) };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}
