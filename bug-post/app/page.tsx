import BugPage from "./components/BugPage";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex flex-row justify-between p-5">
      <p className="text-7xl">Newest Questions</p>
      <Link href='/newquestion' className="bg-green-600 text-5xl rounded-lg p-5">Ask Question</Link>
    </div>
     <BugPage></BugPage>
    </>
    
  );
}