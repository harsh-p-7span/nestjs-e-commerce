import { Field, InputType } from '@nestjs/graphql';
import { Upload } from 'src/common/scalars/upload.scalar';

@InputType()
export class UploadImageInput {
  @Field(() => Upload)
  image: Upload;
}
