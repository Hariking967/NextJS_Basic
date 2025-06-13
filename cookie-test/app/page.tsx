import { cookies } from 'next/headers';

export default function HomePage() {
  const cookieStore = cookies();
  // const myCookie = cookieStore.get('my-cookie-name')?.value ?? 'No cookie set';

  // return <p>Cookie value: {myCookie}</p>;
}