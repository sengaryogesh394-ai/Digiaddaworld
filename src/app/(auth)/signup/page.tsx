import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

function GoogleIcon() {
    return (
      <svg role="img" viewBox="0 0 24 24" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.63-4.5 1.63-5.42 0-9.42-4.42-9.42-9.83s3.9-9.83 9.42-9.83c2.73 0 4.8.92 6.3 2.33l2.66-2.66C19.05 1.36 16.14 0 12.48 0 5.88 0 .04 5.84.04 12.92s5.84 12.92 12.44 12.92c3.28 0 5.84-1.12 7.76-3.05 2.05-2.05 2.72-4.96 2.72-8.32 0-.6-.05-1.18-.15-1.72z" />
      </svg>
    );
  }

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>Join our community of creators and shoppers</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full">Create Account</Button>
        <div className="relative">
          <Separator />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-card text-muted-foreground text-sm">OR</div>
        </div>
        <Button variant="outline" className="w-full">
            <GoogleIcon />
            Sign up with Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p>
            Already have an account?{' '}
            <Link href="/login" className="underline">
                Sign in
            </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
