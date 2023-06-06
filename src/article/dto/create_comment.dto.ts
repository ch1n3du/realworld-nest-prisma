import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateCommentSchema = z.object({
  body: z.string().nonempty(),
});

export class CreateCommentDto extends createZodDto(CreateCommentSchema) {}
