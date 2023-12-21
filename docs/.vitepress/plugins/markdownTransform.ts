import type { Plugin } from 'vite'
import { resolve, relative } from 'path'

const ROOT = resolve(__dirname, '../../')

export function MarkdownTransform(): Plugin {
  return {
    name: 'docs-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md'))
        return null

      id = relative(ROOT, id)

      if (id == 'index.md')
        return null

      code = pageHeaderTemplate(code)
      code = pageFooterTemplate(code)

      return code
    },
  }
}


const pageHeaderTemplate = (code: string) => code.replace(/(^---$(\s|\S)+^---$)/m, `$1

# {{ $frontmatter.title }}

<PageInfo />

`)

const pageFooterTemplate = (code: string) => `${code}

## 变更记录

<Changelog />
`