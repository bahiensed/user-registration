import Image from 'next/image'
import Link from 'next/link'
import { Button, Input } from '@/components/ui'

const Header = () => {
  return (
    <header className='flex flex-row w-full h-16 px-4 items-center justify-between'>
      <div className='font-light font-spaceGrotesk text-3xl tracking-tight'>
        <Link href='/' aria-label='Homepage' className='flex items-center gap-2'>
          <Image
            src="/assets/images/favicon.svg"
            width={32}
            height={32}
            alt="ham flow"
          />
          Ham <span className=''>Flow</span>
        </Link>
      </div>





      <div>
        <Input type='text' placeholder='Search' aria-label='Search' />
      </div>
      <div>
        <span>Theme</span>
        <span>Clerk</span>
        <Button aria-label='User Log In' />
        <Button aria-label='User Sign Up' />
      </div>
    </header>
  )
}

export default Header