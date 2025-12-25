import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon } from "lucide-react";

export default function Footer() {
  // get the current time in Dhaka (UTC+6)
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/AshiqSazid"
              target="_blank"
              rel="noreferrer noopener"
              passHref
              className="text-foreground transition hover:text-primary"
            >
              Ashiq Sazid
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex hidden flex-row items-center space-x-2 md:flex">
            <p className="text-xs text-muted-foreground">Dhaka time:</p>
            <p className="text-sm font-semibold">{time} UTC+6</p>
          </span>
        </span>
        <Button asChild variant="outline">
          <Link
            href="mailto:ashiqsazid494@gmail.com"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <MailIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:flex">ashiqsazid494@gmail.com</span>
          </Link>
        </Button>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}
