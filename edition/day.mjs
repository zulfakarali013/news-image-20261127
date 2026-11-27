// What happened on Friday 27 November 2026, as shown on the page.
// Each illustrated story has a sureness label: CONFIRMED (two or more outlets),
// OFFICIAL (government or organiser), REPORTED (one outlet) or TODAY (scheduled for the day).
// Anything that turned out to be from 26 November or earlier moved to `olderNews`.

export const edition = {
  isoDate: '2026-11-27',
  dayName: 'Friday',
  pledge: 'Everything here took place, or first broke, on Friday 27 November 2026. Each item carries a sureness label; earlier news is listed in the date check.',
  topLine: 'EU summit ends with no budget and no €45bn for Ukraine · Gulf attacks keep Brent near $96 · NZ coalition one seat short',
  outlets: 'Reuters · AP · AFP · Politico · Kyodo · Yonhap · SCMP · Globe and Mail · Vanguard',
};

// Three big stories across the top. lat/lon place the map pin.
export const headliners = [
  {
    where: 'Brussels', zone: 'Europe', lat: 50.85, lon: 4.35, sketch: 'council', sure: 'CONFIRMED',
    tag: 'EU · BUDGET SUMMIT',
    title: 'EU leaders walk out without a budget',
    line: 'Summit ends early with no deal on the 2028–34 budget or the €45bn loan for Ukraine.',
    credit: 'Reuters · Politico',
  },
  {
    where: 'Strait of Hormuz', zone: 'Middle East', lat: 26.6, lon: 56.3, sketch: 'barrel', sure: 'CONFIRMED',
    tag: 'GULF · OIL',
    title: 'Brent stays near $96 as Gulf attacks go on',
    line: 'Crude sits close to its November peak and heads for a weekly rise after strikes on tankers and Saudi plants.',
    credit: 'Reuters',
  },
  {
    where: 'Wellington', zone: 'Oceania', lat: -41.29, lon: 174.78, sketch: 'ballot', sure: 'OFFICIAL',
    tag: 'NEW ZEALAND · VOTE',
    title: "NZ's right bloc ends one seat short",
    line: "Official result gives Luxon's coalition 65 of 130 seats, so Opportunity's 7 MPs now hold the balance.",
    credit: 'Electoral Commission · Reuters',
  },
];

// Ten smaller illustrated stories.
export const panels = [
  { where: 'Fujian', zone: 'East Asia', lat: 25.0, lon: 119.3, sketch: 'bridge', sure: 'REPORTED', tag: 'CHINA · TAIWAN', title: 'China rehearses a boat-bridge landing', line: 'Linked vessels form an 800 m span opposite Taiwan.' },
  { where: 'Hong Kong', zone: 'East Asia', lat: 22.35, lon: 114.1, sketch: 'ferry', sure: 'CONFIRMED', tag: 'HONG KONG', title: '24 injured as ferry rams a pier', line: 'Shenzhen-bound fast boat struck a Tsing Yi dock.' },
  { where: 'Gaza', zone: 'Middle East', lat: 31.5, lon: 34.45, sketch: 'gaza', sure: 'REPORTED', tag: 'GAZA · WAR', title: '10 killed in overnight strikes', line: 'Hospital count; Hamas is weighing its response.' },
  { where: 'Tokyo', zone: 'East Asia', lat: 35.68, lon: 139.69, sketch: 'bars', sure: 'OFFICIAL', tag: 'JAPAN · PRICES', title: 'Tokyo core prices rise 2.9%', line: 'Fastest pace in 16 months; a Dec BoJ hike in view.' },
  { where: 'Paris', zone: 'Europe', lat: 48.86, lon: 2.35, sketch: 'hack', sure: 'CONFIRMED', tag: 'FRANCE · MEDIA', title: 'Cyberattack takes AFP service down', line: "The agency's client news platform went offline." },
  { where: 'Zaporizhzhia', zone: 'Europe', lat: 47.51, lon: 34.58, sketch: 'plant', sure: 'OFFICIAL', tag: 'UKRAINE · NUCLEAR', title: 'IAEA asks for a truce at the plant', line: 'Outside power was cut for the 28th time.' },
  { where: 'Ankara', zone: 'Middle East', lat: 39.93, lon: 32.86, sketch: 'pact', sure: 'OFFICIAL', tag: 'TURKEY · DEFENCE', title: 'Erdoğan ratifies Mecca defence pact', line: 'Joint deal with Saudi Arabia and Pakistan.' },
  { where: 'Moscow', zone: 'Europe', lat: 55.75, lon: 37.62, sketch: 'drones', sure: 'REPORTED', tag: 'RUSSIA · UKRAINE', title: 'Moscow claims 343 drones shot down', line: 'Its overnight tally over 15 regions, unverified.' },
  { where: 'Dhaka', zone: 'South Asia', lat: 23.81, lon: 90.41, sketch: 'flight', sure: 'REPORTED', tag: 'BANGLADESH', title: 'Hasina names a 16 Dec homecoming', line: 'Ousted leader says she will fly back from Delhi.' },
  { where: 'United States', zone: 'North America', lat: 39.0, lon: -95.0, sketch: 'trolley', sure: 'TODAY', tag: 'USA · SHOPPING', title: 'Black Friday opens with tight wallets', line: '85% expect to spend the same or less.' },
];

// Shorter items, one line each.
export const roundup = [
  ['East Asia', 'Taipei', 'Final rallies before local polls'],
  ['East Asia', 'Beijing', 'October factory profits jump 20.1%'],
  ['East Asia', 'Seoul', 'Chips may lift Nov exports 96.8%'],
  ['East Asia', 'Seoul', 'Justice ministry raided over leak'],
  ['East Asia', 'Tokyo', 'Minister Seki beats censure, 124–120'],
  ['East Asia', 'Seoul', '6 drifted N. Koreans repatriated'],
  ['East Asia', 'Pyongyang', 'Kim sees visiting Russian troupe'],
  ['Southeast Asia', 'Jakarta', 'Mulls first fuel hike in 5 years'],
  ['Southeast Asia', 'Jakarta', 'Daycare owner gets 9-year term'],
  ['Southeast Asia', 'Kuala Lumpur', 'AirAsia delays staff salaries'],
  ['Southeast Asia', 'Bangkok', 'Bangchak refinery fire controlled'],
  ['Southeast Asia', 'Hat Yai', 'Heavy-rain alert through 30 Nov'],
  ['South Asia', 'Mumbai', 'Rupee weakens to 92.62 on oil'],
  ['Middle East', 'Tehran', 'Warns South Korea off Gulf naval role'],
  ['Oceania', 'Melbourne', 'Coalition leads in Newspoll'],
  ['Oceania', 'Canberra', 'IMF warns on A$3.1tn pension pool'],
  ['Africa', 'Niamey', '13 troops killed near Mali border'],
  ['Africa', 'Lagos', 'Crash fire kills six on highway'],
  ['Africa', 'Abuja', 'Pension arrears from 2013 settled'],
  ['Africa', 'Nairobi', 'Sh30bn road-safety plan unveiled'],
  ['Africa', 'Twifo Praso, Ghana', 'Drug-raid clash: 1 dead'],
  ['Africa', 'Addis Ababa', '$1bn bond swap offer'],
  ['North America', 'Ottawa', 'Top court rules on Bill 21 today'],
  ['Latin America', 'Brasília', 'Trabuco set as finance minister'],
  ['Latin America', 'Buenos Aires', 'Deputies pass 2027 budget'],
];

export const figures = [
  ['65/130', 'NZ coalition seats — one short of a majority'],
  ['$96', 'Brent crude per barrel, close to its Nov high'],
  ['+20.1%', 'China industrial profits, October y/y'],
  ['2.9%', 'Tokyo core CPI, highest in 16 months'],
];

// Clock times in UTC.
export const clock = [
  ['00:30', 'Hack hits AFP platform'],
  ['01:00', 'NZ official result'],
  ['01:21', 'Tsing Yi ferry crash'],
  ['01:30', 'China profits data'],
  ['04:44', 'N. Koreans handed back'],
  ['11:00', 'Black Friday opens'],
];

export const olderNews = [
  'Kuwait drone attack on Italians — 26 Nov',
  'Kyiv strike and Zelensky warning — 26 Nov',
  'Odesa grain ships struck — 26 Nov',
  'ECB president pick — 26 Nov',
  'Argentina central-bank law vote — 26 Nov',
  'Samra demolitions — 22 Nov',
];
