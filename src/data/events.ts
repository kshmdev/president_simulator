import { GovernmentEvent } from '@/types/game';

export const governmentEvents: GovernmentEvent[] = [
  // Day 1-30 Events - Opening Arc
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
    category: 'cabinet',
    choices: [
      {
        text: 'Stand by your nominee and fight for confirmation',
        consequence: 'The nominee is eventually confirmed after a brutal battle. Your base sees loyalty, but the fight cost political capital.',
        approvalChange: -3,
        nextEventId: 'economic-report',
      },
      {
        text: 'Ask your nominee to withdraw and select someone new',
        consequence: 'A smooth transition to a less controversial pick. Some see it as wise; others as weakness. You\'ll need to hire a new Attorney General.',
        approvalChange: 2,
        nextEventId: 'hire-attorney-general',
        fireCabinetMember: 'attorney_general',
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
    id: 'hire-attorney-general',
    title: 'New Attorney General Needed',
    description: 'With your previous nominee withdrawn, you need to select a new Attorney General. This position is crucial for your administration\'s legal strategy and justice reform agenda.',
    category: 'cabinet',
    triggerCabinetHiring: 'attorney_general',
    choices: [
      {
        text: 'Review candidates and make your selection',
        consequence: 'You carefully consider the candidates for this important position.',
        approvalChange: 0,
        nextEventId: 'economic-report',
        requiresCabinetHiring: 'attorney_general',
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
        nextEventId: 'border-crisis',
      },
      {
        text: 'Announce austerity measures to control government spending',
        consequence: 'Fiscal conservatives praise you, but program cuts anger many constituents.',
        approvalChange: -4,
        nextEventId: 'border-crisis',
      },
      {
        text: 'Take a wait-and-see approach, projecting calm confidence',
        consequence: 'The economy steadies on its own. Lucky timing makes you look wise.',
        approvalChange: 3,
        nextEventId: 'border-crisis',
      },
    ],
  },
  // New Event - Border Crisis
  {
    id: 'border-crisis',
    title: 'Border Emergency',
    description: 'A sudden surge of migrants at the southern border overwhelms processing facilities. Images of overcrowded detention centers dominate the news. Your Homeland Security Secretary awaits instructions.',
    category: 'crisis',
    choices: [
      {
        text: 'Deploy additional resources and fast-track processing',
        consequence: 'The humanitarian crisis eases, but critics say you\'re encouraging more migration.',
        approvalChange: 2,
        nextEventId: 'international-summit',
      },
      {
        text: 'Implement stricter enforcement and turn back arrivals',
        consequence: 'Your base cheers, but international condemnation follows. Images of families being turned away go viral.',
        approvalChange: -5,
        nextEventId: 'international-summit',
      },
      {
        text: 'Negotiate emergency aid with Central American nations',
        consequence: 'A diplomatic approach shows leadership, but the crisis continues in the short term.',
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
        nextEventId: 'cyber-attack',
      },
      {
        text: 'Decline the private meeting, negotiating only with allies present',
        consequence: 'Allies appreciate the solidarity, but the trade impasse continues.',
        approvalChange: 2,
        nextEventId: 'cyber-attack',
      },
      {
        text: 'Issue a public ultimatum demanding concessions',
        consequence: 'Your tough stance plays well at home, but diplomatic relations chill.',
        approvalChange: -2,
        nextEventId: 'cyber-attack',
      },
    ],
  },
  // New Event - Cyber Attack
  {
    id: 'cyber-attack',
    title: 'Critical Infrastructure Attack',
    description: 'A sophisticated cyber attack has crippled the power grid in three major cities. Intelligence points to a hostile nation-state. Millions are without power, and panic is spreading.',
    category: 'crisis',
    choices: [
      {
        text: 'Publicly attribute the attack and impose immediate sanctions',
        consequence: 'Swift action reassures the public, but the hostile nation threatens retaliation.',
        approvalChange: 6,
        nextEventId: 'natural-disaster',
      },
      {
        text: 'Launch a covert counter-cyber operation',
        consequence: 'You disable their capabilities, but it leaks to the press. Debate rages about cyber warfare ethics.',
        approvalChange: 3,
        nextEventId: 'natural-disaster',
      },
      {
        text: 'Focus resources on restoring power and investigate quietly',
        consequence: 'Power is restored quickly, but critics say you look weak on the world stage.',
        approvalChange: -3,
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
        nextEventId: 'press-secretary-crisis',
      },
      {
        text: 'Coordinate relief from Washington to avoid disrupting rescue operations',
        consequence: 'Efficient response, but critics wish you had shown more personal involvement.',
        approvalChange: 4,
        nextEventId: 'press-secretary-crisis',
      },
      {
        text: 'Delegate to FEMA and focus on the legislative agenda',
        consequence: 'The response is adequate, but you appear detached. "Where is the President?" headlines appear.',
        approvalChange: -8,
        nextEventId: 'press-secretary-crisis',
      },
    ],
  },
  // New Cabinet Crisis - Press Secretary
  {
    id: 'press-secretary-crisis',
    title: 'Press Briefing Disaster',
    description: 'Your Press Secretary made false statements during a briefing that directly contradict intelligence reports. The media is in an uproar, and your credibility is being questioned.',
    category: 'cabinet',
    choices: [
      {
        text: 'Fire the Press Secretary immediately and apologize',
        consequence: 'Swift accountability is praised, but you lose a loyal team member. You\'ll need to find a replacement.',
        approvalChange: 3,
        nextEventId: 'hire-press-secretary',
        fireCabinetMember: 'press_secretary',
      },
      {
        text: 'Stand by your Press Secretary and claim it was a misunderstanding',
        consequence: 'Your base appreciates loyalty, but the media smells blood in the water.',
        approvalChange: -5,
        nextEventId: 'healthcare-vote',
      },
      {
        text: 'Issue a correction but keep the Press Secretary',
        consequence: 'A measured response that satisfies no one completely.',
        approvalChange: -2,
        nextEventId: 'healthcare-vote',
      },
    ],
  },
  {
    id: 'hire-press-secretary',
    title: 'New Press Secretary Needed',
    description: 'With your Press Secretary gone, you need a new face to represent your administration to the media. This role is vital for shaping public perception.',
    category: 'cabinet',
    triggerCabinetHiring: 'press_secretary',
    choices: [
      {
        text: 'Review candidates and make your selection',
        consequence: 'You consider who will best represent your vision to the American people.',
        approvalChange: 0,
        nextEventId: 'healthcare-vote',
        requiresCabinetHiring: 'press_secretary',
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
        nextEventId: 'russia-tensions',
      },
      {
        text: 'Appeal to their conscience with a personal call about struggling constituents',
        consequence: 'One Senator is moved; the other holds firm. The bill passes by one vote.',
        approvalChange: 8,
        nextEventId: 'russia-tensions',
      },
      {
        text: 'Threaten to campaign against them in their next election',
        consequence: 'Both Senators vote no out of spite. The bill fails, a major setback.',
        approvalChange: -10,
        nextEventId: 'russia-tensions',
      },
    ],
  },
  // New Event - Russia Tensions
  {
    id: 'russia-tensions',
    title: 'Russian Aggression',
    description: 'Russia has moved troops to the border of a NATO ally. The alliance is demanding a strong response. Your Secretary of Defense and Secretary of State have conflicting advice.',
    category: 'diplomacy',
    choices: [
      {
        text: 'Deploy additional American troops to NATO\'s eastern flank',
        consequence: 'NATO allies are reassured, but tensions with Russia escalate dangerously.',
        approvalChange: 5,
        nextEventId: 'scandal-breaks',
      },
      {
        text: 'Open diplomatic back-channels with Moscow',
        consequence: 'A private deal de-escalates the crisis, but you\'re criticized for being too soft.',
        approvalChange: -3,
        nextEventId: 'scandal-breaks',
      },
      {
        text: 'Call for emergency UN Security Council session',
        consequence: 'Multilateral approach wins international praise but achieves little concrete action.',
        approvalChange: 2,
        nextEventId: 'scandal-breaks',
      },
    ],
  },
  {
    id: 'scandal-breaks',
    title: 'White House Scandal',
    description: 'A major news outlet publishes a story alleging your Chief of Staff accepted improper gifts from lobbyists. The story is dominating the news cycle.',
    category: 'cabinet',
    choices: [
      {
        text: 'Immediately fire your Chief of Staff to demonstrate zero tolerance',
        consequence: 'Swift action is praised, but you lose a loyal ally and institutional knowledge. Time to find a replacement.',
        approvalChange: 5,
        nextEventId: 'hire-chief-of-staff',
        fireCabinetMember: 'chief_of_staff',
      },
      {
        text: 'Order an internal investigation before taking action',
        consequence: 'The investigation finds minor infractions. Critics say you protected a friend.',
        approvalChange: -3,
        nextEventId: 'middle-east-crisis',
      },
      {
        text: 'Denounce the story as politically motivated fake news',
        consequence: 'Your base rallies, but moderates are troubled by the aggressive dismissal.',
        approvalChange: -5,
        nextEventId: 'middle-east-crisis',
      },
    ],
  },
  {
    id: 'hire-chief-of-staff',
    title: 'New Chief of Staff Needed',
    description: 'The Chief of Staff is arguably the most important position in the White House. Your next pick will shape the rest of your presidency.',
    category: 'cabinet',
    triggerCabinetHiring: 'chief_of_staff',
    choices: [
      {
        text: 'Review candidates and make your selection',
        consequence: 'You carefully weigh the options for this crucial role.',
        approvalChange: 0,
        nextEventId: 'middle-east-crisis',
        requiresCabinetHiring: 'chief_of_staff',
      },
    ],
  },
  // New Event - Middle East Crisis
  {
    id: 'middle-east-crisis',
    title: 'Middle East Powder Keg',
    description: 'A drone strike in the Middle East has killed a senior military commander of a hostile nation. They\'re threatening massive retaliation. Your military advisors are on high alert.',
    category: 'crisis',
    choices: [
      {
        text: 'Prepare for military escalation and evacuate non-essential personnel',
        consequence: 'Your preparedness is praised, but oil prices spike and markets tumble.',
        approvalChange: 2,
        nextEventId: 'tech-regulation',
      },
      {
        text: 'Seek diplomatic resolution through back-channels',
        consequence: 'Tensions ease gradually. You\'re criticized for not being tough enough.',
        approvalChange: -2,
        nextEventId: 'tech-regulation',
      },
      {
        text: 'Address the nation and call for calm while remaining firm',
        consequence: 'Your steady leadership reassures Americans. The situation slowly de-escalates.',
        approvalChange: 7,
        nextEventId: 'tech-regulation',
      },
    ],
  },
  // New Event - Tech Regulation
  {
    id: 'tech-regulation',
    title: 'Big Tech Showdown',
    description: 'Congress has passed bipartisan legislation to break up major tech companies. The bill is on your desk. Tech CEOs are lobbying hard, but antitrust advocates are watching.',
    category: 'domestic',
    choices: [
      {
        text: 'Sign the bill and take on Big Tech',
        consequence: 'Populist victory! But tech stocks crash and some worry about stifling innovation.',
        approvalChange: 8,
        nextEventId: 'climate-summit',
      },
      {
        text: 'Veto the bill, citing economic concerns',
        consequence: 'Tech stocks surge, but you\'re accused of siding with billionaires over people.',
        approvalChange: -6,
        nextEventId: 'climate-summit',
      },
      {
        text: 'Negotiate amendments before signing',
        consequence: 'A more moderate bill passes. Neither side is fully satisfied, but markets stabilize.',
        approvalChange: 3,
        nextEventId: 'climate-summit',
      },
    ],
  },
  // New Event - Climate Summit
  {
    id: 'climate-summit',
    title: 'Global Climate Summit',
    description: 'You\'re hosting a major climate summit. Environmental groups demand bold commitments. Industry warns of economic devastation from aggressive climate policies.',
    category: 'diplomacy',
    choices: [
      {
        text: 'Announce aggressive carbon reduction targets ahead of schedule',
        consequence: 'Environmental groups celebrate. Industry warns of job losses.',
        approvalChange: 4,
        nextEventId: 'treasury-resignation',
      },
      {
        text: 'Propose a market-based solution with industry buy-in',
        consequence: 'A pragmatic approach wins bipartisan praise but disappoints activists.',
        approvalChange: 5,
        nextEventId: 'treasury-resignation',
      },
      {
        text: 'Focus on technology innovation rather than regulations',
        consequence: 'Industry is relieved, but environmental groups are furious.',
        approvalChange: -3,
        nextEventId: 'treasury-resignation',
      },
    ],
  },
  // New Cabinet Event - Treasury
  {
    id: 'treasury-resignation',
    title: 'Treasury Secretary Resigns',
    description: 'Your Secretary of the Treasury has resigned citing health reasons, but leaks suggest disagreements over economic policy. Markets are nervous.',
    category: 'cabinet',
    triggerCabinetHiring: 'secretary_of_treasury',
    choices: [
      {
        text: 'Accept the resignation gracefully and select a new Secretary',
        consequence: 'A smooth transition is essential for market stability.',
        approvalChange: 0,
        nextEventId: 'space-achievement',
        requiresCabinetHiring: 'secretary_of_treasury',
        fireCabinetMember: 'secretary_of_treasury',
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
        nextEventId: 'pandemic-threat',
      },
      {
        text: 'Delay the mission for additional safety reviews',
        consequence: 'Engineers find a critical flaw. The delay saves lives and shows prudent leadership.',
        approvalChange: 8,
        nextEventId: 'pandemic-threat',
      },
      {
        text: 'Redirect funds from NASA to more pressing domestic needs',
        consequence: 'You\'re seen as practical by some, but the cancellation crushes national morale.',
        approvalChange: -7,
        nextEventId: 'pandemic-threat',
      },
    ],
  },
  // New Event - Pandemic Threat
  {
    id: 'pandemic-threat',
    title: 'Emerging Pandemic',
    description: 'A new virus is spreading rapidly in Asia. Early reports suggest it\'s highly contagious. The CDC recommends precautionary travel restrictions.',
    category: 'crisis',
    choices: [
      {
        text: 'Implement immediate travel restrictions and ramp up testing',
        consequence: 'Early action prevents widespread outbreak. Some call it an overreaction.',
        approvalChange: 10,
        nextEventId: 'supreme-court-vacancy',
      },
      {
        text: 'Monitor the situation and prepare hospitals quietly',
        consequence: 'Cases emerge but are contained. You look measured and competent.',
        approvalChange: 5,
        nextEventId: 'supreme-court-vacancy',
      },
      {
        text: 'Downplay the threat to avoid economic panic',
        consequence: 'Cases spike dramatically. Your slow response is blamed for the outbreak.',
        approvalChange: -12,
        nextEventId: 'supreme-court-vacancy',
      },
    ],
  },
  // New Event - Supreme Court
  {
    id: 'supreme-court-vacancy',
    title: 'Supreme Court Vacancy',
    description: 'A Supreme Court Justice has announced retirement. This is your chance to shape the Court for a generation. The confirmation battle will be fierce.',
    category: 'opportunity',
    choices: [
      {
        text: 'Nominate a proven moderate to ensure confirmation',
        consequence: 'Easy confirmation, but your base feels betrayed by the safe choice.',
        approvalChange: 2,
        nextEventId: 'infrastructure-battle',
      },
      {
        text: 'Choose a bold progressive/conservative to energize your base',
        consequence: 'After a brutal confirmation fight, your nominee is confirmed narrowly. Base is thrilled.',
        approvalChange: 7,
        nextEventId: 'infrastructure-battle',
      },
      {
        text: 'Make history with a groundbreaking choice',
        consequence: 'Your historic nominee faces intense scrutiny but prevails. America takes notice.',
        approvalChange: 10,
        nextEventId: 'infrastructure-battle',
      },
    ],
  },
  // New Event - Infrastructure
  {
    id: 'infrastructure-battle',
    title: 'Infrastructure Showdown',
    description: 'Your massive infrastructure bill is stuck in Congress. You can pass a smaller bipartisan version or fight for the full package through reconciliation.',
    category: 'domestic',
    choices: [
      {
        text: 'Accept the bipartisan compromise',
        consequence: 'A historic infrastructure investment passes with bipartisan support. Less than you wanted, but still transformative.',
        approvalChange: 8,
        nextEventId: 'defense-secretary-crisis',
      },
      {
        text: 'Push for the full package through reconciliation',
        consequence: 'After months of negotiations, you get most of what you wanted. Your party is exhausted.',
        approvalChange: 5,
        nextEventId: 'defense-secretary-crisis',
      },
      {
        text: 'Walk away and blame the opposition',
        consequence: 'Nothing passes. You score political points but America\'s infrastructure continues to crumble.',
        approvalChange: -8,
        nextEventId: 'defense-secretary-crisis',
      },
    ],
  },
  // New Cabinet Crisis - Defense Secretary
  {
    id: 'defense-secretary-crisis',
    title: 'Pentagon Power Struggle',
    description: 'Your Secretary of Defense has publicly contradicted your foreign policy on a major talk show. The Joint Chiefs are confused about who sets policy.',
    category: 'cabinet',
    choices: [
      {
        text: 'Demand a public apology or resignation',
        consequence: 'The Secretary resigns. You look strong but need to find a replacement quickly.',
        approvalChange: 4,
        nextEventId: 'hire-defense-secretary',
        fireCabinetMember: 'secretary_of_defense',
      },
      {
        text: 'Meet privately to hash out differences',
        consequence: 'You reach an understanding, but the incident highlighted divisions in your team.',
        approvalChange: -2,
        nextEventId: 'terrorist-threat',
      },
      {
        text: 'Publicly back your Secretary to show a united front',
        consequence: 'Unity is restored, but some wonder if you changed your position under pressure.',
        approvalChange: -3,
        nextEventId: 'terrorist-threat',
      },
    ],
  },
  {
    id: 'hire-defense-secretary',
    title: 'New Secretary of Defense Needed',
    description: 'With tensions rising globally, you need a strong Secretary of Defense who will execute your vision. The Pentagon and your allies are watching this choice closely.',
    category: 'cabinet',
    triggerCabinetHiring: 'secretary_of_defense',
    choices: [
      {
        text: 'Review candidates and make your selection',
        consequence: 'The security of the nation depends on this choice.',
        approvalChange: 0,
        nextEventId: 'terrorist-threat',
        requiresCabinetHiring: 'secretary_of_defense',
      },
    ],
  },
  // New Event - Terrorist Threat
  {
    id: 'terrorist-threat',
    title: 'Credible Terrorist Threat',
    description: 'Intelligence agencies have intercepted chatter about a major terrorist attack planned for next week. The target appears to be critical infrastructure.',
    category: 'crisis',
    choices: [
      {
        text: 'Raise the threat level and warn the public',
        consequence: 'The plot is foiled when conspirators panic. Some say you caused unnecessary fear.',
        approvalChange: 6,
        nextEventId: 'education-reform',
      },
      {
        text: 'Launch covert operations to neutralize the threat',
        consequence: 'Operatives eliminate the threat. The public never knows how close it was.',
        approvalChange: 3,
        nextEventId: 'education-reform',
      },
      {
        text: 'Coordinate with international partners for a joint operation',
        consequence: 'A multinational success story that strengthens alliances.',
        approvalChange: 8,
        nextEventId: 'education-reform',
      },
    ],
  },
  // New Event - Education Reform
  {
    id: 'education-reform',
    title: 'Education Crisis',
    description: 'New data shows American students falling further behind in global rankings. Teachers\' unions demand more funding, while reformers push for school choice.',
    category: 'domestic',
    choices: [
      {
        text: 'Propose massive federal investment in public schools',
        consequence: 'Teachers\' unions celebrate. Critics worry about federal overreach.',
        approvalChange: 4,
        nextEventId: 'ally-in-crisis',
      },
      {
        text: 'Push for school choice and charter school expansion',
        consequence: 'Reformers cheer, but unions threaten political consequences.',
        approvalChange: -2,
        nextEventId: 'ally-in-crisis',
      },
      {
        text: 'Create a bipartisan commission to study the issue',
        consequence: 'A punt that pleases no one. The issue continues to fester.',
        approvalChange: -4,
        nextEventId: 'ally-in-crisis',
      },
    ],
  },
  // New Event - Allied Nation Crisis
  {
    id: 'ally-in-crisis',
    title: 'Allied Nation Under Attack',
    description: 'A close ally has been invaded by a regional power. They\'re invoking mutual defense treaties and requesting immediate military assistance.',
    category: 'diplomacy',
    choices: [
      {
        text: 'Honor the treaty and deploy forces immediately',
        consequence: 'A swift response repels the invasion. America\'s word is trusted worldwide.',
        approvalChange: 12,
        nextEventId: 'economic-boom',
      },
      {
        text: 'Provide military aid and advisors but not combat troops',
        consequence: 'A measured response that helps without risking American lives directly.',
        approvalChange: 5,
        nextEventId: 'economic-boom',
      },
      {
        text: 'Push for diplomatic solution and sanctions',
        consequence: 'Allies feel abandoned. The invasion succeeds. American credibility suffers.',
        approvalChange: -10,
        nextEventId: 'economic-boom',
      },
    ],
  },
  // New Opportunity Event
  {
    id: 'economic-boom',
    title: 'Economic Surge',
    description: 'Unemployment hits a 50-year low, wages are rising, and the stock market is at record highs. Economists credit your policies.',
    category: 'opportunity',
    choices: [
      {
        text: 'Take credit and push for more of your economic agenda',
        consequence: 'Riding high on success, your approval soars. But hubris concerns some.',
        approvalChange: 10,
        nextEventId: 'state-of-state-secretary',
      },
      {
        text: 'Warn that challenges remain and stay focused',
        consequence: 'A measured response that shows wisdom. Some wish you\'d celebrate more.',
        approvalChange: 5,
        nextEventId: 'state-of-state-secretary',
      },
      {
        text: 'Propose new spending to lock in gains',
        consequence: 'Popular programs are created, but some worry about overheating the economy.',
        approvalChange: 7,
        nextEventId: 'state-of-state-secretary',
      },
    ],
  },
  // New Cabinet Event - Secretary of State
  {
    id: 'state-of-state-secretary',
    title: 'Diplomatic Discord',
    description: 'Your Secretary of State has been conducting unauthorized negotiations with a hostile power. When confronted, they claim it was in America\'s best interest.',
    category: 'cabinet',
    choices: [
      {
        text: 'Fire the Secretary of State for insubordination',
        consequence: 'A dramatic firing sends a message. But the diplomatic fallout is significant.',
        approvalChange: 3,
        nextEventId: 'hire-state-secretary',
        fireCabinetMember: 'secretary_of_state',
      },
      {
        text: 'Review the negotiations and take credit if they\'re good',
        consequence: 'The deal turns out to be favorable. You\'re opportunistic but effective.',
        approvalChange: 5,
        nextEventId: 'mass-shooting',
      },
      {
        text: 'Privately reprimand but keep them on',
        consequence: 'Stability is maintained, but you look weak internally.',
        approvalChange: -3,
        nextEventId: 'mass-shooting',
      },
    ],
  },
  {
    id: 'hire-state-secretary',
    title: 'New Secretary of State Needed',
    description: 'America\'s chief diplomat has been dismissed. World leaders are waiting to see who will represent the United States on the global stage.',
    category: 'cabinet',
    triggerCabinetHiring: 'secretary_of_state',
    choices: [
      {
        text: 'Review candidates and make your selection',
        consequence: 'The world is watching who you choose to represent America.',
        approvalChange: 0,
        nextEventId: 'mass-shooting',
        requiresCabinetHiring: 'secretary_of_state',
      },
    ],
  },
  // New Event - Domestic Tragedy
  {
    id: 'mass-shooting',
    title: 'National Tragedy',
    description: 'A horrific mass shooting has claimed dozens of lives. The nation mourns, and calls for action are deafening. Both sides of the gun debate are watching.',
    category: 'crisis',
    choices: [
      {
        text: 'Push for comprehensive gun reform legislation',
        consequence: 'A difficult bill passes. Lives will be saved, but you\'ve made powerful enemies.',
        approvalChange: 5,
        nextEventId: 'final-crisis',
      },
      {
        text: 'Focus on mental health funding and school security',
        consequence: 'A measured approach that draws fire from all sides.',
        approvalChange: 0,
        nextEventId: 'final-crisis',
      },
      {
        text: 'Call for unity and healing without specific policy proposals',
        consequence: 'You comfort the nation but frustrate those demanding action.',
        approvalChange: -5,
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
