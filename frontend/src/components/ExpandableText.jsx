import { useState } from 'react';

function ExpandableText({ text = '', maxLength = 96 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) {
    return <span className="text-sm text-slate-500">No explanation available.</span>;
  }

  const shouldTruncate = text.length > maxLength;
  const preview = shouldTruncate && !expanded ? `${text.slice(0, maxLength).trim()}...` : text;

  return (
    <div className="space-y-2">
      <p className="text-sm leading-6 text-slate-600">{preview}</p>
      {shouldTruncate ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="text-sm font-semibold text-teal-700 transition hover:text-teal-900"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      ) : null}
    </div>
  );
}

export default ExpandableText;
