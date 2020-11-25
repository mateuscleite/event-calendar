import { Injectable } from '@nestjs/common';
import { User } from '../class/user';

@Injectable()
export class UsersService {

    users: User[] = [
        { email: "admin@admin.com", name: "admin", password: "admin", events:["festa1", "reunião1"]},
        { email: "mateus@gmail.com", name: "Mateus", password: "123", events:["entrevista", "aula"]}
    ]

    getAll(){
        return this.users;
    }

    getByEmail(email: string){
        const user = this.users.find(value => value.email === email)
        return user;
    }

    create(user: User){
        this.users.push(user)

        return user;
    }

    update(user: User){
        const existingUser = this.getByEmail(user.email)
        if(existingUser){
            existingUser.email = user.email
            existingUser.events = user.events
            existingUser.name = user.name
            existingUser.password = user.password
        }

        return existingUser;
    }

    delete(email: string){
        const index = this.users.findIndex(value => value.email === email)
        this.users.splice(index)
    }

}
