import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <>
    <Image
      src="/background.jpg"
      width={10000}
      height={1000}
      className="absolute bg-cover z-[-1]"
    />
            <Link href="/">
          <Image
            src="ieeecslogo.svg"
            width={150}
            height={150}
            alt="IEEE Computer Society Logo"
          />
        </Link>
    <h1 className="text-8xl font-bold text-center p-4 ">IDEATION</h1>
  </>
  );
}
