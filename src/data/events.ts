import { GovernmentEvent } from '@/types/game';

export const governmentEvents: GovernmentEvent[] = [
  // Day 1-30 Events
  {
    id: 'inauguration',
    title: 'Inauguration Day',
    description: 'You stand before millions as the 47th President of the United States. The weight of the office settles on your shoulders. Your first decision: the tone of your inaugural address.',
    category: 'domestic',
    choices: [
      {
        text: 'Deliver a unifying speech calling for national healing',
        consequence: 'Your approval rating soars as Americans appreciate the call for unity. Even opponents acknowledge your statesmanship.',
        approvalChange: 8,
        nextEventId: 'cabinet-crisis',
      },
      {
        text: 'Outline an ambitious agenda to fulfill your campaign promises',
        consequence: 'Your base is energized, but opponents warn of divisive times ahead.',
        approvalChange: 3,
        nextEventId: 'cabinet-crisis',
      },
      {
        text: 'Make a fiery speech calling out the opposition',
        consequence: 'Your base loves it, but independents are turned off by the combative tone.',
        approvalChange: -5,
        nextEventId: 'cabinet-crisis',
      },
    ],
  },
  {
    id: 'cabinet-crisis',
    title: 'Cabinet Controversy',
    description: 'Your nominee for Attorney General faces allegations of misconduct from 20 years ago. The confirmation hearings are becoming a media circus. Do you stand by your pick?',
    category: 'domestic',
    choices: [
      {
        text: 'Stand by your nominee and fight for confirmation',
        consequence: 'The nominee is eventually confirmed after a brutal battle. Your base sees loyalty, but the fight cost political capital.',
        approvalChange: -3,
        nextEventId: 'economic-report',
      },
      {
        text: 'Ask your nominee to withdraw and select someone new',
        consequence: 'A smooth transition to a less controversial pick. Some see it as wise; others as weakness.',
        approvalChange: 2,
        nextEventId: 'economic-report',
      },
      {
        text: 'Launch an investigation to verify the claims',
        consequence: 'The investigation clears your nominee, but the delay costs precious momentum on your agenda.',
        approvalChange: 0,
        nextEventId: 'economic-report',
      },
    ],
  },
  {
    id: 'economic-report',
    title: 'Economic Warning Signs',
    description: 'The Federal Reserve presents a concerning report: inflation is rising faster than expected, and a recession may be looming. Markets are watching your response closely.',
    category: 'crisis',
    choices: [
      {
        text: 'Propose an emergency stimulus package to shore up the economy',
        consequence: 'Markets stabilize, but critics warn about adding to the national debt.',
        approvalChange: 5,
        nextEventId: 'international-summit',
      },
      {
        text: 'Announce austerity measures to control government spending',
        consequence: 'Fiscal conservatives praise you, but program cuts anger many constituents.',
        approvalChange: -4,
        nextEventId: 'international-summit',
      },
      {
        text: 'Take a wait-and-see approach, projecting calm confidence',
        consequence: 'The economy steadies on its own. Lucky timing makes you look wise.',
        approvalChange: 3,
        nextEventId: 'international-summit',
      },
    ],
  },
  {
    id: 'international-summit',
    title: 'G20 Summit',
    description: 'You arrive at your first G20 Summit. World leaders are sizing you up. The Chinese Premier requests a private meeting about trade tensions.',
    category: 'diplomacy',
    choices: [
      {
        text: 'Meet privately and negotiate a new trade framework',
        consequence: 'You emerge with a groundbreaking deal. Critics say you gave too much; supporters hail your diplomacy.',
        approvalChange: 7,
        nextEventId: 'natural-disaster',
      },
      {
        text: 'Decline the private meeting, negotiating only with allies present',
        consequence: 'Allies appreciate the solidarity, but the trade impasse continues.',
        approvalChange: 2,
        nextEventId: 'natural-disaster',
      },
      {
        text: 'Issue a public ultimatum demanding concessions',
        consequence: 'Your tough stance plays well at home, but diplomatic relations chill.',
        approvalChange: -2,
        nextEventId: 'natural-disaster',
      },
    ],
  },
  {
    id: 'natural-disaster',
    title: 'Hurricane Devastation',
    description: 'A Category 5 hurricane has devastated the Gulf Coast. Thousands are displaced, and the death toll is rising. FEMA requests emergency authorization.',
    category: 'crisis',
    choices: [
      {
        text: 'Immediately deploy all federal resources and visit the disaster zone',
        consequence: 'Your hands-on leadership is praised. Images of you comforting victims go viral.',
        approvalChange: 12,
        nextEventId: 'healthcare-vote',
      },
      {
        text: 'Coordinate relief from Washington to avoid disrupting rescue operations',
        consequence: 'Efficient response, but critics wish you had shown more personal involvement.',
        approvalChange: 4,
        nextEventId: 'healthcare-vote',
      },
      {
        text: 'Delegate to FEMA and focus on the legislative agenda',
        consequence: 'The response is adequate, but you appear detached. "Where is the President?" headlines appear.',
        approvalChange: -8,
        nextEventId: 'healthcare-vote',
      },
    ],
  },
  {
    id: 'healthcare-vote',
    title: 'The Healthcare Vote',
    description: 'Your signature healthcare bill is coming to a vote in Congress. Two moderate Senators are undecided. You have leverage through a military base in their state.',
    category: 'domestic',
    choices: [
      {
        text: 'Promise to protect the military base in exchange for their votes',
        consequence: 'The bill passes! But ethics watchdogs criticize the backroom dealing.',
        approvalChange: 6,
        nextEventId: 'scandal-breaks',
      },
      {
        text: 'Appeal to their conscience with a personal call about struggling constituents',
        consequence: 'One Senator is moved; the other holds firm. The bill passes by one vote.',
        approvalChange: 8,
        nextEventId: 'scandal-breaks',
      },
      {
        text: 'Threaten to campaign against them in their next election',
        consequence: 'Both Senators vote no out of spite. The bill fails, a major setback.',
        approvalChange: -10,
        nextEventId: 'scandal-breaks',
      },
    ],
  },
  {
    id: 'scandal-breaks',
    title: 'White House Scandal',
    description: 'A major news outlet publishes a story alleging your Chief of Staff accepted improper gifts from lobbyists. The story is dominating the news cycle.',
    category: 'crisis',
    choices: [
      {
        text: 'Immediately fire your Chief of Staff to demonstrate zero tolerance',
        consequence: 'Swift action is praised, but you lose a loyal ally and institutional knowledge.',
        approvalChange: 5,
        nextEventId: 'space-achievement',
      },
      {
        text: 'Order an internal investigation before taking action',
        consequence: 'The investigation finds minor infractions. Critics say you protected a friend.',
        approvalChange: -3,
        nextEventId: 'space-achievement',
      },
      {
        text: 'Denounce the story as politically motivated fake news',
        consequence: 'Your base rallies, but moderates are troubled by the aggressive dismissal.',
        approvalChange: -5,
        nextEventId: 'space-achievement',
      },
    ],
  },
  {
    id: 'space-achievement',
    title: 'Historic Space Mission',
    description: 'NASA announces a breakthrough: the first crewed mission to Mars is ready for launch. This could define your presidency or become a catastrophic failure.',
    category: 'opportunity',
    choices: [
      {
        text: 'Give the green light and make it a national moment of pride',
        consequence: 'The mission succeeds! You give a speech reminiscent of JFK. America celebrates.',
        approvalChange: 15,
        nextEventId: 'final-crisis',
      },
      {
        text: 'Delay the mission for additional safety reviews',
        consequence: 'Engineers find a critical flaw. The delay saves lives and shows prudent leadership.',
        approvalChange: 8,
        nextEventId: 'final-crisis',
      },
      {
        text: 'Redirect funds from NASA to more pressing domestic needs',
        consequence: 'You\'re seen as practical by some, but the cancellation crushes national morale.',
        approvalChange: -7,
        nextEventId: 'final-crisis',
      },
    ],
  },
  {
    id: 'final-crisis',
    title: 'Constitutional Crisis',
    description: 'The Supreme Court has struck down your signature legislation. The ruling is controversial, and your party is demanding you defy the Court or expand its membership.',
    category: 'crisis',
    choices: [
      {
        text: 'Accept the ruling and work with Congress on new legislation',
        consequence: 'You\'re praised for respecting democratic institutions. Historians will look kindly on this moment.',
        approvalChange: 10,
      },
      {
        text: 'Push for a constitutional amendment to override the decision',
        consequence: 'A bold move that energizes your base. The amendment process begins, but success is uncertain.',
        approvalChange: 5,
      },
      {
        text: 'Propose expanding the Supreme Court to shift its balance',
        consequence: 'A power move that divides the nation. Your legacy will be debated for generations.',
        approvalChange: -8,
      },
    ],
  },
];

export const getEventById = (id: string): GovernmentEvent | undefined => {
  return governmentEvents.find(event => event.id === id);
};
