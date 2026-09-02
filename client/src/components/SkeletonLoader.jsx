export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-4 space-y-3">
      <div className="skeleton h-4 w-3/4"></div>
      <div className="skeleton h-3 w-full"></div>
      <div className="skeleton h-3 w-5/6"></div>
      <div className="skeleton h-32 w-full rounded-xl"></div>
    </div>
  );
}
export function SkeletonList({ count = 3 }) {
  return <div className="space-y-3">{Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}</div>;
}
