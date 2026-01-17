interface ContactIdProps {
  params: Promise<{ slug: string }>;
}

export default async function ContactId({ params }: ContactIdProps) {
  const { slug } = await params;
  return <div>Contact {slug}</div>;
}