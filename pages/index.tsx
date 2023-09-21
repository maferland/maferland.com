import TagSEO from '@/components/TagSEO'
import TagSchema from '@/components/TagSchema'
import Image from 'next/image'
import logo from '@/public/logo.png'
import ButtonGradient from '@/components/ButtonGradient'

export default function Home() {
  return (
    <>
      <TagSEO
        canonicalSlug=""
        title={undefined}
        description={undefined}
        keywords={undefined}
        og={undefined}
      />
      <TagSchema />

      <main className="flex min-h-screen flex-col items-center justify-center text-center gap-12 p-8">
        <Image
          src={logo}
          alt="Marc-Antoine Ferland logo"
          priority={true}
          className="lg:w-64 lg:h-64 w-32 h-32 rounded-full"
          width={1024}
          height={1024}
        />

        <h1 className="text-3xl font-bold">Marc-Antoine Ferland ⚙️</h1>

        <p className="text-lg opacity-80">I got bored of my old website</p>

        <ButtonGradient href="https://v2.maferland.com/blog">
          See my old blog posts{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        </ButtonGradient>
      </main>
    </>
  )
}
