import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const userProfile = await User.findById(params.id)

    if(!userProfile) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(userProfile), { status: 200 });
  } catch (error) {
    
  }
};
