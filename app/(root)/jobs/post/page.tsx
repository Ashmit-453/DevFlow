import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ROUTES from '@/constants/routes';
import JobForm from '@/components/forms/JobForm';

const PostJob = async () => {
    const session = await auth();
    if (!session) redirect(ROUTES.SIGN_IN);

    return (
        <>
            <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">Post a Job</h1>
            </section>
            <div className="mt-9">
                <JobForm />
            </div>
        </>
    );
};

export default PostJob;
