import { DebateQuestion } from '@/types/game';

export const debateQuestions: DebateQuestion[] = [
  {
    id: 'economy-1',
    question: "The unemployment rate has risen to 6.5%. What immediate action would you take to create jobs?",
    answers: [
      {
        text: "Invest heavily in infrastructure projects to create millions of construction and manufacturing jobs.",
        impact: 12,
        response: "A bold plan that resonates with working-class voters. Your poll numbers climb.",
      },
      {
        text: "Provide tax incentives for small businesses to encourage hiring and expansion.",
        impact: 8,
        response: "A measured approach that appeals to business owners and moderates.",
      },
      {
        text: "Cut regulations to make it easier for companies to operate and hire.",
        impact: 5,
        response: "Some applaud the pro-business stance, while others worry about worker protections.",
      },
      {
        text: "Focus on retraining programs for workers in declining industries.",
        impact: 3,
        response: "Thoughtful, but voters wanted more immediate action. Lukewarm response.",
      },
    ],
  },
  {
    id: 'healthcare-1',
    question: "Healthcare costs continue to burden American families. How would you address this crisis?",
    answers: [
      {
        text: "Implement a public option that competes with private insurance to drive down costs.",
        impact: 14,
        response: "The crowd erupts in applause. This hits home for millions of struggling families.",
      },
      {
        text: "Negotiate directly with pharmaceutical companies to cap drug prices.",
        impact: 10,
        response: "A popular stance that shows you're willing to take on powerful industries.",
      },
      {
        text: "Expand Medicaid and subsidies to cover more uninsured Americans.",
        impact: 6,
        response: "A safe choice that won't alienate moderates, but doesn't excite the base.",
      },
      {
        text: "Let the free market find solutions through competition.",
        impact: -5,
        response: "Boos from the audience. This approach hasn't worked and voters know it.",
      },
    ],
  },
  {
    id: 'foreign-1',
    question: "Tensions are rising with a major world power. How would you handle this diplomatic crisis?",
    answers: [
      {
        text: "Engage in direct diplomacy while maintaining a position of strength.",
        impact: 11,
        response: "You appear presidential and measured. Voters appreciate the balanced approach.",
      },
      {
        text: "Strengthen alliances with our partners to present a united front.",
        impact: 9,
        response: "A smart strategy that shows you understand the value of coalition building.",
      },
      {
        text: "Impose immediate sanctions to demonstrate consequences.",
        impact: 4,
        response: "Some see it as tough, others as reckless. Mixed reaction.",
      },
      {
        text: "Prioritize American interests first and avoid entanglement.",
        impact: -3,
        response: "Critics call it isolationist. Your foreign policy credentials take a hit.",
      },
    ],
  },
  {
    id: 'climate-1',
    question: "Climate change is causing more frequent natural disasters. What's your climate policy?",
    answers: [
      {
        text: "Launch a Green New Deal with massive investments in clean energy and jobs.",
        impact: 13,
        response: "Young voters are energized! This bold vision inspires a new generation.",
      },
      {
        text: "Set ambitious but achievable carbon reduction targets with industry cooperation.",
        impact: 8,
        response: "A pragmatic approach that balances environmental and economic concerns.",
      },
      {
        text: "Focus on technological innovation and nuclear energy.",
        impact: 5,
        response: "Some appreciate the tech focus, but environmentalists wanted more.",
      },
      {
        text: "The economy must come first; we can address climate later.",
        impact: -8,
        response: "Groans from the audience. This is seen as denial of a pressing issue.",
      },
    ],
  },
  {
    id: 'education-1',
    question: "How would you improve the American education system?",
    answers: [
      {
        text: "Make college free and forgive student loan debt to open doors for everyone.",
        impact: 12,
        response: "Students and parents cheer! This addresses a burden affecting millions.",
      },
      {
        text: "Increase funding for public schools and raise teacher salaries nationwide.",
        impact: 10,
        response: "Educators and parents applaud this investment in our future.",
      },
      {
        text: "Expand school choice and charter school options for families.",
        impact: 3,
        response: "Divisive. Some parents like options, but public school advocates are concerned.",
      },
      {
        text: "Leave education to the states and reduce federal involvement.",
        impact: -2,
        response: "Critics argue this would widen inequality between wealthy and poor states.",
      },
    ],
  },
];
