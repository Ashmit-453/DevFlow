import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getJob } from '@/lib/actions/job.action';
import { Button } from '@/components/ui/button';
import TagCard from '@/components/cards/TagCard';
import { getTimeStamp } from '@/lib/utils';

const JOB_TYPE_LABELS: Record<string, string> = {
    fulltime: 'Full Time',
    parttime: 'Part Time',
    contract: 'Contract',
    internship: 'Internship',
};

const JobDetail = async ({ params }: RouteParams) => {
    const { id } = await params;
    const { success, data: job } = await getJob({ jobId: id });

    if (!success || !job) notFound();

    return (
        <>
            <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                    <h1 className="h1-bold text-dark100_light900">{job.title}</h1>
                    <p className="body-regular text-dark400_light500 mt-1">{job.company}</p>
                </div>
                <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 shrink-0" asChild>
                    <Link href={job.applyLink} target="_blank" rel="noopener noreferrer">
                        Apply Now
                    </Link>
                </Button>
            </section>

            <div className="card-wrapper mt-8 rounded-[10px] p-6 sm:p-8">
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <Image src="/icons/carbon-location.svg" alt="location" width={18} height={18} />
                        <span className="body-regular text-dark400_light700">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image src="/icons/suitcase.svg" alt="type" width={18} height={18} />
                        <span className="body-regular text-dark400_light700">
                            {JOB_TYPE_LABELS[job.type] ?? job.type}
                        </span>
                    </div>
                    {job.salary && (
                        <div className="flex items-center gap-2">
                            <Image src="/icons/currency-dollar-circle.svg" alt="salary" width={18} height={18} />
                            <span className="body-regular text-dark400_light700">{job.salary}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Image src="/icons/clock.svg" alt="posted" width={18} height={18} />
                        <span className="body-regular text-dark400_light700">
                            Posted {getTimeStamp(new Date(job.createdAt))}
                        </span>
                    </div>
                </div>
            </div>

            <div className="card-wrapper mt-6 rounded-[10px] p-6 sm:p-8">
                <h2 className="h2-semibold text-dark200_light900 mb-4">Job Description</h2>
                <p className="body-regular text-dark500_light700 whitespace-pre-line">{job.description}</p>
            </div>

            <div className="card-wrapper mt-6 rounded-[10px] p-6 sm:p-8">
                <h2 className="h2-semibold text-dark200_light900 mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <TagCard key={tag} _id={tag} name={tag} compack />
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <Button className="primary-gradient min-h-[46px] px-8 py-3 !text-light-900" asChild>
                    <Link href={job.applyLink} target="_blank" rel="noopener noreferrer">
                        Apply for this Position
                    </Link>
                </Button>
            </div>
        </>
    );
};

export default JobDetail;
