"use client";

interface MonthStepProps {
  months: string[];
  handleMonthSelect: (month_url: string) => void;
  onCancel: (current_step: string) => void;
}

export default function MonthStep({
  handleMonthSelect,
  months,
  onCancel,
}: MonthStepProps) {
  const formatArchiveUrl = (url: string) => {
    const datePart = url.slice(-7);
    const date = new Date(datePart);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-2">
      {months.map((month_url, index) => (
        <button
          key={index}
          onClick={() => handleMonthSelect(month_url)}
          className="cursor-pointer w-full px-4 py-3 bg-card text-foreground rounded border border-interactive hover:bg-interactive hover:border-status-engine transition-colors"
        >
          {formatArchiveUrl(month_url)}
        </button>
      ))}
      <button
        onClick={() => onCancel("month")}
        className="cursor-pointer w-full px-4 py-2 border border-interactive text-muted rounded hover:text-foreground transition-colors mt-4"
      >
        Cancel
      </button>
    </div>
  );
}
