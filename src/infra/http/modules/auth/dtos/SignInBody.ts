import { IsNotEmptyCustom } from '../../../classValidator/decorators/IsNotEmptyCustom';
import { IsPhoneCustom } from '../../../classValidator/decorators/IsPhoneCustom';
import { IsStringCustom } from '../../../classValidator/decorators/IsStringCustom';
import { LengthCustom } from '../../../classValidator/decorators/LengthCustom';

export class SignInBody {
  @IsPhoneCustom()
  @LengthCustom(13, 13)
  @IsStringCustom()
  @IsNotEmptyCustom()
  phone: string;

  @LengthCustom(6, 128)
  @IsStringCustom()
  @IsNotEmptyCustom()
  password: string;
}
