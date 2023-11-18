export default function PageHeader({
  title,
  display,
  description,
}: {
  title: string;
  display: string;
  description: string;
}) {
  return (
    <div className="text-start p-2">
      {display === 'true' ? (
        <div className="text-2xl font-bold text-[#618264]">HELLO, JED</div>
      ) : null}
      <span className="text-8xl font-bold flex">
        <h1>{title.slice(0, -1)}</h1>{' '}
        <h1 className="text-[#618264]">{title.charAt(title.length - 1)}.</h1>
      </span>

      {description.length > 0 ? (
        <p className="break-words max-w-lg ml-2 mt-[1rem]">{description}</p>
      ) : null}
    </div>
  );
}
