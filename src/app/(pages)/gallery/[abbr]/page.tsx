type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GallPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  // const searchParams = await props.searchParams;
  const params = await props.params;
  const abbr = params.abbr;

  return <></>;
}
