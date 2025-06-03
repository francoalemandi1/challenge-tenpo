interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`text-sm font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded ${className}`}>
      {children}
    </span>
  );
} 