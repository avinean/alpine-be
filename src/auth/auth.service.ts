import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<{ access_token: string }> {
    if (!(login === process.env.LOGIN && password === process.env.PASSWORD))
      throw new UnauthorizedException();

    const payload = {
      sub: login,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
