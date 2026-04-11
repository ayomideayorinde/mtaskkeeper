import { Header } from '../components/Header'
import { Tasks } from '../components/Tasks';
import { AddTasks } from '../components/AddTasks';

export function Dashboard({ setIsLoggedIn, isLoggedIn, currentUser }) {
  return (
    <section className='Dashboard w-full'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />
      <div className='w-full flex flex-col p-4 lg:px-36 lg:gap-2 mt-3'>
        <p className='lg:text-xl text-md'>Hi <span className='font-bold'>Michael</span>, Welcome to your dashboard!</p>
        <hr className='border-b-2' />
      </div>
      <Tasks currentUser={currentUser} />
    </section>
  );
}