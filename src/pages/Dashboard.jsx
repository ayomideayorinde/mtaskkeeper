import { Header } from '../components/Header'
import { Tasks } from '../components/Tasks';
import { AddTasks } from '../components/AddTasks';

export function Dashboard({ setIsLoggedIn, isLoggedIn }) {
  return (
    <section className='Dashboard w-full'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className='w-full flex flex-col p-4 lg:px-36 lg:gap-2 mt-3'>
        <p className='text-xl lg:text-2xl font-semibold'>Hello Michael!</p>
        <p className='lg:text-xl text-md'>Welcome to your dashboard!</p>
        <hr className='border-b-2' />
      </div>
      <Tasks />
    </section>
  );
}