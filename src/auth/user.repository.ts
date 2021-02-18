import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import *  as bcrypt from "bcrypt";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import { Alias } from "typeorm/query-builder/Alias";

@EntityRepository(User)
export class userRepository extends Repository<User>{

    async signUp(authCredential : AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredential;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUserPassword(authCredential: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredential;
        const user = await this.findOne({username});

        if (user && await user.validatePassword(password)) {
            return username;
        } else {
            return null;
        }
    }

    private async hashPassword( password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}