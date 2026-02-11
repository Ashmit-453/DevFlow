"use server";
import mongoose from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { SignInSchema,SignUpSchema } from "../validations";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { signIn } from "@/auth";
import { NotFoundError } from "../http-errors";

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {

  const validationResult = await action({
    params,
    schema: SignUpSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  let { name, username, email, password } =
    validationResult.params!;

  // normalize email
  email = email.toLowerCase();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check existing email
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Check existing username
    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const [newUser] = await User.create(
      [{ username, name, email }],
      { session }
    );

    // Create account
    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    // Commit DB transaction
    await session.commitTransaction();

    // Auto login after signup
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };

  } catch (error) {
    // IMPORTANT FIX
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return handleError(error) as ErrorResponse;

  } finally {
    await session.endSession();
  }
}
  export async function signInWithCredentials(
     params: Pick<AuthCredentials, "email"| "password">) : Promise<ActionResponse> {
    const validationResult = await action({ params, schema: SignInSchema});

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { email, password } = validationResult.params!;
 
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) throw new NotFoundError("User")  

        const existingAccount = await Account.findOne({
            provider: "credentials",
            providerAccountId: email
        })

        if (!existingAccount) throw new NotFoundError("Account"); 
        
        const passwordMatch = await bcrypt.compare(
            password,
            existingAccount.password
        );

    if (!passwordMatch) throw new Error("Password does not match");
     
    await signIn("credentials", { email, password, redirect: false }); 
    return { success: true};

    } catch (error) { 
        return handleError(error) as ErrorResponse;
    }  
}
