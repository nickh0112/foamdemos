interface Props {
  thumbnails: string[]
  count: number
}

export default function ContentThumbnails({ thumbnails, count }: Props) {
  const visible = thumbnails.slice(0, 3)
  const remaining = count - 3

  return (
    <div className="flex items-center gap-1">
      {visible.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="w-7 h-7 rounded object-cover"
        />
      ))}
      {remaining > 0 && (
        <span className="text-[11px] text-text-tertiary ml-0.5">
          +{remaining}
        </span>
      )}
    </div>
  )
}
