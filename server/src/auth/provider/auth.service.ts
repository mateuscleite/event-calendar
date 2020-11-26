import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService){

    }

    async validateUser(email: string, password: string){
        const user = await this.usersService.getByEmail(email)
        if(user && (user.password === password)){
            const {_id, name, email} = user
            return {id: _id, name, email}
        }

        return null;
    }

}
