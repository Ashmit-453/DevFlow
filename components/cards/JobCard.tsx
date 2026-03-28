import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TagCard from './TagCard';

const JOB_TYPE_LABELS: Record<string, string> = {
    fulltime: "Full Time",
    parttime: "Part Time",
    contract: "Contract",
    internship: "Internship",
};

const JobCard = ({
    _id,
    title,
    description,
    company,
    location,
    type,
    salary,
    applyLink,
    tags,
}: JobPost) => (
    <div className="card-wrapper rounded-[10px] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="background-light800_dark400 flex size-12 shrink-0 items-center justify-center rounded-xl">
                    <Image src="/icons/suitcase.svg" alt="job" width={24} height={24} />
                </div>
                <div>
                    <Link href={`/jobs/${_id}`}>
                        <h3 className="base-semibold text-dark200_light900 line-clamp-1 hover:text-primary-500">
                            {title}
                        </h3>
                    </Link>
                    <p className="body-regular text-dark400_light500 mt-0.5">{company}</p>
                </div>
            </div>

            <span className="background-light800_dark400 subtle-regular text-dark500_light700 shrink-0 rounded-full px-3 py-1">
                {JOB_TYPE_LABELS[type] ?? type}
            </span>
        </div>

        <p className="body-regular text-dark500_light700 mt-4 line-clamp-2">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
                <TagCard key={tag} _id={tag} name={tag} compack />
            ))}
        </div>

        <div className="flex-between mt-5 flex-wrap gap-3">
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <Image src="/icons/carbon-location.svg" alt="location" width={16} height={16} />
                    <span className="subtle-regular text-dark400_light700">{location}</span>
                </div>
                {salary && (
                    <div className="flex items-center gap-1.5">
                        <Image src="/icons/currency-dollar-circle.svg" alt="salary" width={16} height={16} />
                        <span className="subtle-regular text-dark400_light700">{salary}</span>
                    </div>
                )}
            </div>

            <Link
                href={applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-primary-500 hover:underline"
            >
                <span className="body-semibold text-sm">Apply Now</span>
                <Image src="/icons/arrow-up-right.svg" alt="apply" width={14} height={14} />
            </Link>
        </div>
    </div>
);

export default JobCard;
