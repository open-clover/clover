import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownPreviewProps {
  content: string
}

const components: Components = {
  code({ node, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    // node.position exists for block-level code (fenced), inline code has no parent block
    const isBlock = node?.position !== undefined && match !== null
    return isBlock ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match![1]}
        PreTag="div"
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-gray-800 px-1 rounded text-xs" {...props}>
        {children}
      </code>
    )
  },
  h1: ({ children }) => <h1 className="text-xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-lg font-semibold text-gray-100 mb-3 mt-6">{children}</h2>,
  h3: ({ children }) => <h3 className="text-base font-semibold text-gray-200 mb-2 mt-4">{children}</h3>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-400 hover:underline"
      onClick={(e) => {
        e.preventDefault()
        if (href) window.open(href, '_blank')
      }}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-600 pl-4 text-gray-400 italic my-2">{children}</blockquote>,
  table: ({ children }) => <table className="border-collapse w-full text-xs my-3">{children}</table>,
  th: ({ children }) => <th className="border border-gray-700 px-3 py-1 text-left text-gray-300 bg-gray-800">{children}</th>,
  td: ({ children }) => <td className="border border-gray-700 px-3 py-1">{children}</td>,
  p: ({ children }) => <p className="mb-3">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="text-gray-300">{children}</li>,
}

export function MarkdownPreview({ content }: MarkdownPreviewProps): JSX.Element {
  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e] px-8 py-6 text-gray-300 text-sm leading-relaxed">
      <div className="max-w-3xl mx-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
