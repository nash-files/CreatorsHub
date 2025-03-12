
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingPlanProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
}

function PricingPlan({ title, price, description, features, ctaLabel, featured = false }: PricingPlanProps) {
  return (
    <div className={`rounded-lg border bg-card p-6 shadow-sm ${featured ? 'ring-2 ring-primary' : ''}`}>
      {featured && (
        <Badge className="mb-2">Most Popular</Badge>
      )}
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-sm font-medium text-muted-foreground">/mo</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-6 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button asChild className={`mt-6 w-full ${featured ? '' : 'bg-muted-foreground'}`}>
        <Link to="/become-creator">{ctaLabel}</Link>
      </Button>
    </div>
  );
}

export function CreatorCTA() {
  const plans = [
    {
      title: "Basic",
      price: 9.99,
      description: "Perfect for beginners starting their creator journey",
      features: [
        "Up to 20 resources",
        "Standard resource approval",
        "30% commission fee",
        "Basic analytics",
        "Email support"
      ],
      ctaLabel: "Start Basic"
    },
    {
      title: "Premium",
      price: 29.99,
      description: "Professional features for growing creators",
      features: [
        "Up to 100 resources",
        "Priority resource approval",
        "20% commission fee",
        "Advanced analytics",
        "Priority support",
        "Custom profile page"
      ],
      ctaLabel: "Go Premium",
      featured: true
    },
    {
      title: "Professional",
      price: 49.99,
      description: "For established creators with high-volume needs",
      features: [
        "Unlimited resources",
        "24h resource approval",
        "15% commission fee",
        "Premium analytics",
        "Dedicated support",
        "Featured placement",
        "API access"
      ],
      ctaLabel: "Go Pro"
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Start Earning as a Creator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs and start monetizing your digital resources today
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PricingPlan
              key={plan.title}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              ctaLabel={plan.ctaLabel}
              featured={plan.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
