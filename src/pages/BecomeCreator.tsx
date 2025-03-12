
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import { PackageType, Package } from '@/types';

const formSchema = z.object({
  bio: z.string().min(20, { message: 'Bio must be at least 20 characters' }),
  packageType: z.enum(['basic', 'premium', 'professional']),
});

const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic Creator',
    price: 9.99,
    description: 'Perfect for beginners starting their creator journey',
    features: [
      'Up to 20 resources',
      'Standard resource approval',
      '30% commission fee',
      'Basic analytics',
      'Email support'
    ],
    resourceLimit: 20,
    commission: 30
  },
  {
    id: 'premium',
    name: 'Premium Creator',
    price: 29.99,
    description: 'Professional features for growing creators',
    features: [
      'Up to 100 resources',
      'Priority resource approval',
      '20% commission fee',
      'Advanced analytics',
      'Priority support',
      'Custom profile page'
    ],
    resourceLimit: 100,
    commission: 20
  },
  {
    id: 'professional',
    name: 'Professional Creator',
    price: 49.99,
    description: 'For established creators with high-volume needs',
    features: [
      'Unlimited resources',
      '24h resource approval',
      '15% commission fee',
      'Premium analytics',
      'Dedicated support',
      'Featured placement',
      'API access'
    ],
    resourceLimit: -1,
    commission: 15
  }
];

const BecomeCreator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('basic');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: '',
      packageType: 'basic',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', values);
    
    // In a real app, we'd make an API call to register the creator
    
    toast({
      title: "Creator account requested",
      description: "Your creator account request has been submitted for review.",
    });
    
    // Redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Become a Creator</h1>
          <p className="text-muted-foreground">
            Set up your creator profile and choose your subscription plan
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Creator Profile</h2>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creator Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about yourself, your expertise, and what kind of resources you plan to share..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Choose Your Package</h2>
              <FormField
                control={form.control}
                name="packageType"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {packages.map((pkg) => (
                        <Card 
                          key={pkg.id}
                          className={`cursor-pointer transition-all ${selectedPackage === pkg.id ? 'ring-2 ring-primary' : ''}`}
                          onClick={() => {
                            setSelectedPackage(pkg.id);
                            field.onChange(pkg.id);
                          }}
                        >
                          <CardHeader>
                            <CardTitle>{pkg.name}</CardTitle>
                            <CardDescription>${pkg.price}/month</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <Check className="h-4 w-4 text-primary mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              type="button" 
                              variant={selectedPackage === pkg.id ? "default" : "outline"}
                              className="w-full"
                              onClick={() => {
                                setSelectedPackage(pkg.id);
                                field.onChange(pkg.id);
                              }}
                            >
                              {selectedPackage === pkg.id ? 'Selected' : 'Select'}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BecomeCreator;
