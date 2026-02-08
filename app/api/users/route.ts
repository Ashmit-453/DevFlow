import User from "@/database/user.model";
import { NextResponse } from 'next/server';
import handleError from "@/lib/handlers/error";
import dbconnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { ValidationError } from "@/lib/http-errors";

export async function GET() {
    try{
        await dbconnect();  
        const users = await User.find();
        return NextResponse.json({ success: true, data: users });

    } catch (error) {
        return handleError(error,"api") as APIErrorResponse;
    }
}
export async function POST(request: Request) {
    try {
        await dbconnect();
        const body = await request.json();
        const validatedData = UserSchema.safeParse(body);
        if (!validatedData.success) {
            throw new ValidationError(validatedData.error.flatten().fieldErrors);
        }
        const { email, username } = validatedData.data;

        const existingUser = await User.findOne({email});
        if(existingUser) throw Error("User already exists");

        const existingUsername = await User.findOne({username});
        if(existingUsername) throw Error("Username already exists");

        const newUser = await User.create(validatedData.data);
        return NextResponse.json({ success: true, data:newUser }, {status: 201})

    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}

 