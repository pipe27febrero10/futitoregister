import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Controller('users')
export class UsersController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Post()
    async createUser(@Body() payload: any): Promise<any> {
        const { username , password } = payload;
        await this.databaseService.createAccount(username,password);
        return {
         message: 'user has been created successfull'
        }
    }
}
