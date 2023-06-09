import { createZodDto } from 'nestjs-zod';
import { TypeOf, z } from 'nestjs-zod/z';

const CreateCommentDataSchema = z.object({
  body: z.string().nonempty(),
});
export type CreateCommentData = TypeOf<typeof CreateCommentDataSchema>

const CreateCommentSchema = z.object({
  comment: CreateCommentDataSchema
})
export class CreateCommentDto extends createZodDto(CreateCommentSchema) { }
