import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
const Home = async () => {
  const session = await auth();
  const buttonClass = "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5 cursor-pointer"
  console.log("Session:", session);
  return (
    <form className='px-10 pt-[100px]' action={async () => {
      "use server";
      await signOut({ redirectTo: ROUTES.SIGN_IN});
    }}>
      <Button className={buttonClass} type='submit'>Log Out </Button>

    </form>

  );
}
export default Home;