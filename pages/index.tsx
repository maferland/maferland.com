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

        <ButtonGradient
          target="_blank"
          href="https://www.linkedin.com/in/marcantoineferland"
        >
          LinkedIn
        </ButtonGradient>

        <a className="link link-hover" href="https://v2.maferland.com/blog">
          Legacy website{' '}
        </a>
      </main>
    </>
  )
}
