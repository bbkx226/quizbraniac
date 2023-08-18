// 404.js: A special file used to handle custom 404 (Not Found) errors
import Link from 'next/link'
 
export default function FourOhFour() {
  return <>
    <h1>404 - Page Not Found</h1>
    <Link href="/">
      <a>
        Go back home
      </a>
    </Link>
  </>
}