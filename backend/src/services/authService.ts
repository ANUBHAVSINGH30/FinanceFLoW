import prisma from "../config/db.js";
import { AppError } from "../utils/appError.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import type { SignupInput, SigninInput } from "../validators/auth.validator.js";

export class AuthService {
  static async signup(data: SignupInput) {

    //check if user already exist
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const userSelect = {
        id: true,
        name: true,
        email: true,
        currency: true,
        createdAt: true,
        } as const;

    //hash password
    const hashedPassword = await hashPassword(data.password);

    //create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select: userSelect,
    });

    //generate roken
    const token = generateToken(user.id);

    return {
      user,
      token,
    };
  }



  //login
  static async signin(data: SigninInput){

    //find user
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    
    //user not found
    if (!user){
        throw new AppError("Invalid user Email or Password", 401);
    }

    //compare password
    const isPasswordvalid = await comparePassword(
        data.password,
        user.password
    );

    if(!isPasswordvalid){
        throw new AppError("Invalid email or password", 401)
    }

    //4. generate token
    const token = generateToken(user.id);

    // 5. Remove password before returning
    const {password, ...safeUser} = user;

    return{
        user: safeUser,
        token,
    };
  }



  //getMe
  static async getMe(userId: string){
    const user = prisma.user.findUnique({
        where: {
            id: userId
        },
        select:{
            id: true,
            name: true,
            email: true,
            currency: true,
            createdAt: true,
        },
    });

    if(!user){
        throw new AppError("User not found", 404);
    }

    return user;
  }
}