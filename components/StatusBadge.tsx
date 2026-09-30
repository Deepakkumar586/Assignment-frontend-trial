interface StatusBadgeProps {
  open: boolean;
  label?: string;
}

export function StatusBadge({ open, label }: StatusBadgeProps) {
  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold tracking-wide ${
        open
          ? "border-[#BFD1C0] bg-[#EEF5EF] text-[#3F6144]"
          : "border-[#E1D4C8] bg-[#F4EEE8] text-[#6D625A]"
      }`}
      aria-label={label ?? (open ? "Open now" : "Closed now")}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${open ? "bg-[#58705B]" : "bg-[#9A8C80]"}`}
      />
      {label ?? (open ? "Open now" : "Closed now")}
    </span>
  );
}
