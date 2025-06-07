import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import BugPage from "./components/BugPage";
import {prisma} from "@/app/lib/prisma"

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session)
  {
    let existUser = await prisma.user.findFirst({
      where : {email : session.user?.email || ""}
    })
    if (!existUser)
    {
      const userInfo = await prisma.user.create({
      data: {
        userName: session.user?.name || "",
        email: session.user?.email || "", 
      }
    })
    console.log("user have been updated to the db");
    }
  }
  return (
    <>
      <div className="flex flex-row justify-between p-5">
        <p className="text-7xl">Newest Questions</p>
        <Link
          href="/newquestion"
          className="bg-green-600 text-5xl rounded-lg p-5"
        >
          Ask Question
        </Link>
      </div>
      <BugPage></BugPage>
    </>
  );
}