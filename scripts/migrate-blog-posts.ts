#!/usr/bin/env tsx

/**
 * Migration script to convert blog posts from JSON format to MDX
 * Fetches posts from the v2 repository and converts them to MDX files
 */

import { promises as fs } from 'fs'
import path from 'path'

interface BlogPost {
  title: string
  slug: string
  date: string
  description: string
  image: {
    url: string
    alt: string
  }
  body: string
}

const BLOG_POSTS = [
  'about-accessible-components',
  'building-a-color-palette-generator',
  'how-to-generate-your-sitemap-xml-for-next-js-and-netlify-cms',
  'how-to-integrate-strava-into-slack',
  'how-to-make-a-gradient-transition-in-css',
  'how-to-use-icomoon-as-a-font-familly-in-next-js',
  'im-joining-capdesk',
  'moving-toward-2021',
  'publishing-a-hooks-library-with-minimal-config',
  'when-you-need-experience-to-gain-experience',
  'why-you-should-use-volta',
]

const BASE_URL =
  'https://raw.githubusercontent.com/maferland/maferland.com-v2/main/site/blog'

async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${BASE_URL}/${slug}.json`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${slug}: ${response.status}`)
    }
    return (await response.json()) as BlogPost
  } catch (error) {
    console.error(`Error fetching ${slug}:`, (error as Error).message)
    return null
  }
}

function convertToMDX(post: BlogPost): string {
  const { title, date, description, image, body } = post

  // Create frontmatter
  const frontmatter = `---
title: "${title}"
date: "${date}"
excerpt: "${description}"
tags: []
---

`

  // Process body - convert any image references if needed
  let processedBody = body

  // Convert any absolute image paths to relative ones if they exist
  processedBody = processedBody.replace(/\/img\//g, '/images/blog/')

  return frontmatter + processedBody
}

async function migratePost(slug: string): Promise<boolean> {
  console.log(`Migrating ${slug}...`)

  const post = await fetchPost(slug)
  if (!post) {
    console.error(`Failed to migrate ${slug}`)
    return false
  }

  const mdxContent = convertToMDX(post)
  const outputPath = path.join(
    process.cwd(),
    'src/content/blog',
    `${post.slug}.mdx`
  )

  try {
    await fs.writeFile(outputPath, mdxContent, 'utf8')
    console.log(`✅ Migrated ${slug} -> ${post.slug}.mdx`)
    return true
  } catch (error) {
    console.error(`❌ Failed to write ${slug}:`, (error as Error).message)
    return false
  }
}

async function migrateAllPosts(): Promise<void> {
  console.log('Starting blog post migration...\n')

  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'src/content/blog')
  try {
    await fs.mkdir(outputDir, { recursive: true })
  } catch (error) {
    console.error(
      'Failed to create output directory:',
      (error as Error).message
    )
    return
  }

  let successful = 0
  let failed = 0

  for (const slug of BLOG_POSTS) {
    const success = await migratePost(slug)
    if (success) {
      successful++
    } else {
      failed++
    }
  }

  console.log(`\n📊 Migration complete:`)
  console.log(`   ✅ Successful: ${successful}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log(`   📝 Total: ${BLOG_POSTS.length}`)
}

// Run migration
migrateAllPosts().catch(console.error)
