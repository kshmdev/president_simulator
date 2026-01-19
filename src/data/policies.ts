import { Policy } from '@/types/game';

export const policies: Policy[] = [
  // Economy
  {
    id: 'tax-cuts',
    name: 'Tax Cuts for Middle Class',
    category: 'economy',
    description: 'Reduce taxes for families earning under $150,000 annually.',
    support: 15,
    opposition: 5,
  },
  {
    id: 'min-wage',
    name: 'Raise Minimum Wage',
    category: 'economy',
    description: 'Increase federal minimum wage to $20 per hour.',
    support: 12,
    opposition: 10,
  },
  {
    id: 'trade-reform',
    name: 'Trade Agreement Reform',
    category: 'economy',
    description: 'Renegotiate international trade deals to protect domestic jobs.',
    support: 10,
    opposition: 8,
  },
  // Healthcare
  {
    id: 'universal-health',
    name: 'Universal Healthcare',
    category: 'healthcare',
    description: 'Implement a single-payer healthcare system for all citizens.',
    support: 18,
    opposition: 15,
  },
  {
    id: 'drug-prices',
    name: 'Lower Drug Prices',
    category: 'healthcare',
    description: 'Allow government negotiation of prescription drug prices.',
    support: 20,
    opposition: 5,
  },
  {
    id: 'mental-health',
    name: 'Mental Health Initiative',
    category: 'healthcare',
    description: 'Expand access to mental health services nationwide.',
    support: 14,
    opposition: 3,
  },
  // Education
  {
    id: 'free-college',
    name: 'Free Community College',
    category: 'education',
    description: 'Make two-year community college free for all students.',
    support: 16,
    opposition: 8,
  },
  {
    id: 'student-loans',
    name: 'Student Loan Forgiveness',
    category: 'education',
    description: 'Cancel up to $50,000 in student loan debt per borrower.',
    support: 15,
    opposition: 12,
  },
  {
    id: 'teacher-pay',
    name: 'Teacher Pay Increase',
    category: 'education',
    description: 'Federal funding to increase teacher salaries by 25%.',
    support: 17,
    opposition: 4,
  },
  // Environment
  {
    id: 'green-energy',
    name: 'Green Energy Transition',
    category: 'environment',
    description: 'Invest $500 billion in renewable energy infrastructure.',
    support: 14,
    opposition: 10,
  },
  {
    id: 'carbon-tax',
    name: 'Carbon Tax',
    category: 'environment',
    description: 'Implement a tax on carbon emissions from major polluters.',
    support: 10,
    opposition: 15,
  },
  {
    id: 'conservation',
    name: 'National Parks Expansion',
    category: 'environment',
    description: 'Protect 30% of federal lands by 2030.',
    support: 12,
    opposition: 5,
  },
  // Security
  {
    id: 'border-security',
    name: 'Border Security Enhancement',
    category: 'security',
    description: 'Increase funding for border patrol and technology.',
    support: 13,
    opposition: 10,
  },
  {
    id: 'veterans-care',
    name: 'Veterans Care Reform',
    category: 'security',
    description: 'Overhaul the VA system to provide better care for veterans.',
    support: 19,
    opposition: 2,
  },
  {
    id: 'cyber-security',
    name: 'Cyber Defense Initiative',
    category: 'security',
    description: 'Create a new agency focused on protecting critical infrastructure.',
    support: 11,
    opposition: 4,
  },
];

export const getCategoryColor = (category: Policy['category']): string => {
  const colors = {
    economy: 'text-gold',
    healthcare: 'text-primary',
    education: 'text-secondary',
    environment: 'text-victory',
    security: 'text-accent',
  };
  return colors[category];
};

export const getCategoryIcon = (category: Policy['category']): string => {
  const icons = {
    economy: '💰',
    healthcare: '🏥',
    education: '📚',
    environment: '🌿',
    security: '🛡️',
  };
  return icons[category];
};
