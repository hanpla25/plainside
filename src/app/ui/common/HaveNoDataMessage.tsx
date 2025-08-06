type Props = {
  message: string;
};

export default function HaveNoDataMessage({ message }: Props) {
  return <div className="text-center py-10 text-neutral-500">{message}</div>;
}
