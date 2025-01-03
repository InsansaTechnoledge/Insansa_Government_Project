import React from 'react'

const ImportantLinksSection = ({data}) => {
    return (
        <footer className="flex-grow text-center">
            <h2 className="text-2xl font-bold mb-6">Important Links</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.document_links.map((link, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all shadow"
                >
                  Document {idx + 1}
                </a>
              ))}
            </div>
          </footer>
      )
}

export default ImportantLinksSection