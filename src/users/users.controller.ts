import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Controller('users')
export class UsersController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Post()
    async createUser(@Body() payload: any): Promise<any> {
        const { username , password } = payload;
        try{
            await this.databaseService.createAccount(username,password);
        }   
        catch(err)
        {
            if(err.message === 'User already exists') throw new BadRequestException(err.message);
            throw new InternalServerErrorException(err.message);
        }
        
        return {
         message: 'user has been created successfull'
        }
    }
}
