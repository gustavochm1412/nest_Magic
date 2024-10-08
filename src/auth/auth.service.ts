import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignUpDto } from "src/deck/dto/signup.dto";
import * as bcrypt from 'bcryptjs';
import { LoginDto } from "src/deck/dto/login.dto";


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}


   async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {

     const { name, email, password } = signUpDto

     const hashedPassword = await bcrypt.hash(password, 10)

     const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword
     })

     const token = this.jwtService.sign( { id: user._id} )
     return { token }
   
   }

   async login(loginDto: LoginDto): Promise<{ token: string }> {
     
     const { email, password } = loginDto

     const user = await this.userModel.findOne({ email })

     if(!user){
        throw new UnauthorizedException("Email ou senha invalido.")
     }

     const isPasswordMatched = await bcrypt.compare(password, user.password)

     if(!isPasswordMatched){
        throw new UnauthorizedException("Email ou senha invalido.")
     }

     const token = this.jwtService.sign({ id: user._id })
     return { token }
   } 
   

}
