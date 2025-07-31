import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super ({
        usernameField: 'email', // if your password field is not named password, then you can specify it here else no need
    })
  }

  validate(email: string, password: string): Promise<any> {
    return this.authService.validateUser(email, password);
  }
}