function Badge({ text, variant = 'default' }) {
  const styles = {
    High: 'from-red-50 to-red-25 border-red-100 bg-gradient-to-r text-red-700 shadow-sm',
    Medium: 'from-amber-50 to-amber-25 border-amber-100 bg-gradient-to-r text-amber-700 shadow-sm',
    Low: 'from-emerald-50 to-emerald-25 border-emerald-100 bg-gradient-to-r text-emerald-700 shadow-sm',
    Fraud: 'from-red-50 to-red-25 border-red-100 bg-gradient-to-r text-red-700 shadow-sm',
    Clear: 'from-emerald-50 to-emerald-25 border-emerald-100 bg-gradient-to-r text-emerald-700 shadow-sm',
    default: 'border-slate-200 bg-slate-50 text-slate-700'
  };

  const cls = styles[variant] || styles.default;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: variant === 'High' || variant === 'Fraud' ? '#ef4444' : variant === 'Medium' ? '#f59e0b' : variant === 'Low' || variant === 'Clear' ? '#14b8a6' : '#94a3b8' }} />
      {text}
    </span>
  );
}

export default Badge;
