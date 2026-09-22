import { LuCheck } from 'react-icons/lu';

export function Brand() {
  return <a className="brand" href="/" aria-label="TaskKeeper home">
    <span className="brand-mark"><LuCheck /></span>
    <div className='flex flex-col gap-0'>
      <span>Task<span className="brand-light">Keeper</span><span className="brand-dot">.</span></span>
      <span className='text-xs font-normal'>created by <a className="font-semibold" href="https://amayorinde.vercel.app" aria-label="Michael Ayorinde" target='_blank'>Michael Ayorinde</a></span>
    </div>
  </a>;
}
