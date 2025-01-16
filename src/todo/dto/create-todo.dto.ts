import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../enum/Status.enum';
import { Priority } from '../enum/Priority.enum';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({ enum: Status })
  @IsNotEmpty()
  @IsEnum(Status)
  status: string;

  @ApiProperty({ enum: Priority })
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: string;

  @ApiProperty()
  isActive: boolean;
}
