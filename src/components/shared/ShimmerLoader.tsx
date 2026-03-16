export default function ShimmerLoader({ width = '100%', height = 12 }: { width?: string | number; height?: number }) {
  return (
    <div
      className="shimmer rounded"
      style={{ width, height, minHeight: height }}
    />
  )
}
