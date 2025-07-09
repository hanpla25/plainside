import { PostButton } from "./buttons";

type Props = {
  abbr: string;
  mode: string | undefined;
};

export default function GalleryTap({ abbr, mode }: Props) {
  return (
    <div className="py-2 space-x-2">
      <PostButton abbr={abbr} mode={mode} modeValue="all" label="전체글" />
      <PostButton
        abbr={abbr}
        mode={mode}
        modeValue="popular"
        label="인기글"
        hrefModeParam="popular"
      />
    </div>
  );
}
