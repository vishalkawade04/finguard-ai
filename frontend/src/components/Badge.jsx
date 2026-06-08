function Badge({ text, variant = 'default' }) {
  const styles = {
    High: 'border-red-200 bg-red-50 text-red-700',
    Medium: 'border-amber-200 bg-amber-50 text-amber-700',
    Low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Fraud: 'border-red-200 bg-red-50 text-red-700',
    Clear: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    default: 'border-slate-200 bg-slate-50 text-slate-700'
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[variant] || styles.default}`}>
      {text}
    </span>
  );
}

export default Badge;
