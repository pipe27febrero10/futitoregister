import { Injectable } from '@nestjs/common';
import { ConnectionPool } from 'mssql';
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class DatabaseService {
    private pool: ConnectionPool;

    constructor() {
        this.pool = new ConnectionPool({
            user: process.env.SQL_SERVER_USERNAME,
            password: process.env.SQL_SERVER_PASSWORD,
            server: process.env.SQL_SERVER_HOST,
            database: process.env.SQL_SERVER_DATABASE,
            port: 43002,
            options: {
                encrypt: false, // Set to true for Azure databases
                trustServerCertificate: true, // Set to true for development purposes
            },
        });

        this.pool.connect();
    }

    async createAccount(username: string, password: string): Promise<any> {
        const checkResult = await this.pool.request()
        .input('AccountName', username)
        .query(`SELECT AccountName FROM Accounts WHERE AccountName=@AccountName`);
        if (checkResult.recordset.length > 0) {
            throw new Error('User already exists');
        }
    
        const result = await this.pool.request()
            .input('AccountName', username)
            .input('NxLoginPwd', password)
            .execute('dnmembership.dbo.__NX__CreateAccount');
        return result.recordset;
    }
}
