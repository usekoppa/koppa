import { ImageContentType } from "./content_type.ts";

export type Image<ContentType extends ImageContentType = ImageContentType> =
  `data:${ContentType},${string}`;

export function Image<ContentType extends ImageContentType>(
  contentType: ContentType,
  data: string,
): Image<ContentType> {
  return `data:${contentType},${data}`;
}
