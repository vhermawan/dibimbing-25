export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold">About</h1>
			{children}
		</div>
	)
}