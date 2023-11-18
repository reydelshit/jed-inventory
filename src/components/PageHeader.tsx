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
        <div className="text-2xl font-bold text-pink-500">HELLO, JED</div>
      ) : null}
      <h1 className="text-8xl font-bold">{title}</h1>
      {description.length > 0 ? (
        <p className="break-words max-w-lg ml-2 mt-[1rem]">{description}</p>
      ) : null}
    </div>
  );
}
