'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '@/components/logo';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

type Role = 'household' | 'municipal' | 'worksman' | 'service';

export default function SignupPage() {
  const [role, setRole] = useState<Role | ''>('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }
    console.log(`Signup request for role: ${role} with ID: ${id}`);
    setIsSubmitted(true);
  };
  
  const getRoleIdLabel = () => {
    switch (role) {
        case 'household': return 'Household ID';
        case 'municipal': return 'Municipal ID';
        case 'worksman': return 'Worksman ID';
        case 'service': return 'Service ID';
        default: return 'ID';
    }
  }

   const getRoleIdPlaceholder = () => {
    switch (role) {
        case 'household': return 'e.g., HH-123';
        case 'municipal': return 'e.g., MUN-456';
        case 'worksman': return 'e.g., WM-789';
        case 'service': return 'e.g., SRV-012';
        default: return 'Enter your desired ID';
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Request Submitted</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert variant="default" className="border-green-500/50 text-green-800 dark:text-green-300 [&>svg]:text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Thank You!</AlertTitle>
                    <AlertDescription>
                        Your signup request has been sent for approval. You will be notified once your account is activated.
                    </AlertDescription>
                </Alert>
                <Link href="/login" passHref>
                    <Button variant="outline" className="w-full">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="mx-auto w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Logo className="mb-4" />
          <CardTitle className="text-2xl font-bold font-headline">Create an Account</CardTitle>
          <CardDescription>Submit your details for approval.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="role">Select Your Role</Label>
              <Select onValueChange={(value: Role) => setRole(value)} value={role}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="household">Household</SelectItem>
                  <SelectItem value="municipal">Municipal Staff</SelectItem>
                  <SelectItem value="worksman">Worksman</SelectItem>
                  <SelectItem value="service">Service Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="role-id">{getRoleIdLabel()}</Label>
                  <Input
                    id="role-id"
                    placeholder={getRoleIdPlaceholder()}
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full" disabled={!role || !id || !password || !confirmPassword}>
              Request Account
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
