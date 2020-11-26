import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){

    }

    async validateUser(email: string, password: string){
        const user = await this.usersService.getByEmail(email)
        if(user && (user.password === password)){
            const {_id, name, email} = user
            return {id: _id, name, email}
        }

        return null;
    }

    async login(user: any){
        const payload = {id: user.id, name: user.name, email: user.email}
        return {access_token: this.jwtService.sign(payload)};
    }

}
