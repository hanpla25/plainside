import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

type CategoryFormResponse = {
  message: string;
  errors?: {
    gallName?: string[];
    abbr?: string[];
  };
  inputs?: {
    gallName?: string;
    abbr?: string;
  };
};

const createGallSchema = z.object({
  gallName: z
    .string()
    .min(1, { message: "갤러리 이름을 입력해주세요." })
    .max(12, { message: "갤러리 이름이 너무 길어요.(12글자 이하)" })
    .regex(/^[가-힣]/, {
      message: "갤러리 이름은 한글만 사용할 수 있어요",
    }),
  abbr: z
    .string()
    .min(1, { message: "갤러리 주소를 입력해주세요." })
    .max(16, { message: "주소가 너무 깁니다.(16글자 이하)" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "갤러리 주소는 영어와 숫자만 사용할 수 있습니다.",
    }),
});

export async function createGall(
  _prevState: CategoryFormResponse | null,
  formData: FormData
): Promise<CategoryFormResponse> {
  const supabase = await createClient();

  try {
    const rawData = {
      gallName: formData.get("name") as string,
      abbr: formData.get("abbr") as string,
    };

    const result = createGallSchema.safeParse(rawData);

    if (!result.success) {
      return {
        message: "입력을 확인해주세요",
        errors: result.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    const { gallName, abbr } = result.data;

    const { error } = await supabase
      .from("galleries")
      .insert({ name: gallName, abbr: abbr });

    if (error) {
      console.error(error);
      return {
        message: "이미 존재하는 갤러리 이름이거나 주소 입니다.",
        inputs: rawData,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "오류가 발생했습니다.",
    };
  }
  redirect("/category");
}
