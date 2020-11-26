import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './provider/auth.service';
import { LocalStrategy } from './provider/local.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [UsersModule],
    providers: [
        AuthService,
        LocalStrategy
    ],
    controllers: [AuthController]
})
export class AuthModule {}
