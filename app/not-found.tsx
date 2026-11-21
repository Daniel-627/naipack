import Link from "next/link";
import "@/styles/globals.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>We could not find that page.</h1>
      <p>It may have moved. Start again from the homepage.</p>
      <div>
        <Link className="btn btn-kraft" href="/">
          Go to the homepage
        </Link>
      </div>
    </div>
  );
}
