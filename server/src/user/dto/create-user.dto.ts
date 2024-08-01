import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'Username should not exceed 20 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username should contain only letters and numbers',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @MaxLength(50, { message: 'Password should not exceed 50 characters' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
