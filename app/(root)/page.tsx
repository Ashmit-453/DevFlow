import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import Link from 'next/link';
import LocalSearch from '@/components/search/LocalSearch';
import HomeFilter from '@/components/filters/HomeFilter'; 
import QuestionCard from '@/components/cards/QuestionCard';
import handleError from '@/lib/handlers/error';
import { ForbiddenError, NotFoundError, ValidationError } from '@/lib/http-errors';
import { getQuestions } from '@/lib/actions/question.action';
import DataRenderer from '@/components/DataRenderer';
import { EMPTY_QUESTION } from '@/constants/states';
const Home =  async({searchParams}:SearchParams) => {
   const { query, filter ,page, pageSize} = await searchParams;
   const { success, data, error} = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",

  });

  const { questions } = data || {};
  // console.log(questions);
 
  return (
    <>
    <section className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
      <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
      <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900' asChild>
        <Link href={ROUTES.ASK_QUESTION}> Ask a Question </Link> 
      </Button> 
    </section>
    <section className='mt-11'>
      <LocalSearch
        route="/"
        imgSrc="/icons/search.svg"
        placeholder="Search questions..." 
        otherClasses="flex-1"      
      />
    </section>
    <HomeFilter/>
     <DataRenderer
      success={success}
      error={error}
      data={questions}
      empty={EMPTY_QUESTION}
      render={(questions) => (
        <div className='mt-10 flex w-full flex-col gap-6'>
        {questions.map((question) => ( 
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
      )} 
     />  
   
  </>
);
};
export default Home;