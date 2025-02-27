export default function Tooltip({ title, bgColor, textColor }: { title: string, bgColor: string, textColor: string }) {
  return (
    <div 
      className={`absolute top-full left-1/2 transform -translate-x-1/2 
      mt-2 w-max px-2 py-1 text-sm text-${textColor} bg-${bgColor} rounded
      shadow-lg opacity-0 group-hover:opacity-100`}
    >
        {title}
    </div>
  )
}