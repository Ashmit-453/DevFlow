"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sonner";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import TagCard from "../cards/TagCard";
import { CreateJobSchema } from "@/lib/validations";
import { createJob } from "@/lib/actions/job.action";
import ROUTES from "@/constants/routes";

const JobForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateJobSchema>>({
        resolver: zodResolver(CreateJobSchema),
        defaultValues: {
            title: "",
            description: "",
            company: "",
            location: "",
            type: "fulltime",
            salary: "",
            applyLink: "",
            tags: [],
        },
    });

    const handleTagKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        field: { value: string[] }
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const tag = e.currentTarget.value.trim();
            if (tag && tag.length <= 30 && !field.value.includes(tag)) {
                form.setValue("tags", [...field.value, tag]);
                e.currentTarget.value = "";
                form.clearErrors("tags");
            }
        }
    };

    const handleTagRemove = (tag: string, field: { value: string[] }) => {
        form.setValue(
            "tags",
            field.value.filter((t) => t !== tag)
        );
    };

    const onSubmit = (data: z.infer<typeof CreateJobSchema>) => {
        startTransition(async () => {
            const result = await createJob(data);
            if (result.success) {
                toast.success("Success", { description: "Job posted successfully!" });
                router.push(ROUTES.JOBS);
            } else {
                toast.error(`Error`, {
                    description: result.error?.message || "Something went wrong",
                });
            }
        });
    };

    return (
        <Form {...form}>
            <form className="flex w-full flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Job Title <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                                    placeholder="e.g. Senior React Developer"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Company & Location */}
                <div className="flex gap-6 max-sm:flex-col">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel className="paragraph-semibold text-dark400_light800">
                                    Company <span className="text-primary-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                                        placeholder="e.g. Acme Inc."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel className="paragraph-semibold text-dark400_light800">
                                    Location <span className="text-primary-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                                        placeholder="e.g. Remote / New York, USA"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Type & Salary */}
                <div className="flex gap-6 max-sm:flex-col">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel className="paragraph-semibold text-dark400_light800">
                                    Job Type <span className="text-primary-500">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border">
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="fulltime">Full Time</SelectItem>
                                        <SelectItem value="parttime">Part Time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel className="paragraph-semibold text-dark400_light800">
                                    Salary <span className="text-light-500">(optional)</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                                        placeholder="e.g. $80k – $120k / yr"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Description <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[140px] border"
                                    placeholder="Describe the role, responsibilities, and requirements..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Apply Link */}
                <FormField
                    control={form.control}
                    name="applyLink"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Apply Link <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                                    placeholder="https://yourcompany.com/careers/job"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Link where candidates can apply for this position.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tags */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Tech Tags <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <div>
                                    <Input
                                        className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                                        placeholder="e.g. react, typescript, node... (press Enter)"
                                        onKeyDown={(e) => handleTagKeyDown(e, field)}
                                    />
                                    {field.value.length > 0 && (
                                        <div className="flex-start mt-2.5 flex-wrap gap-3">
                                            {field.value.map((tag) => (
                                                <TagCard
                                                    key={tag}
                                                    _id={tag}
                                                    name={tag}
                                                    compack
                                                    remove
                                                    isButton
                                                    handleRemove={() => handleTagRemove(tag, field)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Add up to 5 tech tags. Press Enter to add each tag.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="primary-gradient w-fit !text-light-900 cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <ReloadIcon className="mr-2 size-4 animate-spin" />
                                <span>Posting...</span>
                            </>
                        ) : (
                            "Post Job"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default JobForm;
