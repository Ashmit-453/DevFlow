import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LocalSearch from '@/components/search/LocalSearch';
import CommonFilter from '@/components/filters/CommonFilter';
import { JobFilters } from '@/constants/filters';
import JobCard from '@/components/cards/JobCard';
import DataRenderer from '@/components/DataRenderer';
import Pagination from '@/components/Pagination';
import { EMPTY_JOBS } from '@/constants/states';
import { getJobs } from '@/lib/actions/job.action';
import ROUTES from '@/constants/routes';

const Jobs = async ({ searchParams }: SearchParams) => {
    const { query = "", filter = "", page = "1" } = await searchParams;

    const { success, data, error } = await getJobs({
        page: Number(page) || 1,
        pageSize: 10,
        query,
        filter,
    });

    const { jobs, isNext } = data || {};

    return (
        <>
            <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">Jobs</h1>
                <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" asChild>
                    <Link href={ROUTES.POST_JOB}>Post a Job</Link>
                </Button>
            </section>

            <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route={ROUTES.JOBS}
                    imgSrc="/icons/job-search.svg"
                    placeholder="Search by title, company, or tech..."
                    otherClasses="flex-1"
                />
                <CommonFilter
                    filters={JobFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </section>

            <DataRenderer
                success={success}
                error={error}
                data={jobs}
                empty={EMPTY_JOBS}
                render={(jobs) => (
                    <div className="mt-10 flex w-full flex-col gap-6">
                        {jobs.map((job) => (
                            <JobCard key={job._id} {...job} />
                        ))}
                    </div>
                )}
            />

            <Pagination page={page} isNext={isNext ?? false} />
        </>
    );
};

export default Jobs;
