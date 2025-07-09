export default function AuthHeader({ label }: { label: string }) {
  return (
    <header className="mx-2 mb-8 lg:mx-0">
      <h1 className="text-xl font-bold">{label}</h1>
    </header>
  );
}
