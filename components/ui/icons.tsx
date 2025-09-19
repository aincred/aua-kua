// components/icons.tsx
import {
  Heart,
  Loader2,
  User,
  Mail,
  Lock,
  Github,
  Twitter,
} from "lucide-react";

export const Icons = {
  Heart,
  Loader: Loader2,
  User,
  Mail,
  Lock,
  Github,
  Twitter,
  Logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7h20L12 2z" />
      <path d="M2 7v7c0 5 10 9 10 9s10-4 10-9V7" />
    </svg>
  ),
};
