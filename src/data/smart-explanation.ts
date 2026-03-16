export const profileData = {
  name: 'J. David Alvarez',
  handle: '@davidalvareeezy',
  location: 'California, United States',
  age: '34 years old · Male',
  avatar: 'https://images.unsplash.com/photo-1563244535-471b9fb5a0fa?w=200&h=200&fit=crop',
  totalFollowers: '4.31m',
  bio: 'David Alvarez is a California-based content creator, chef, and entertainer known for his vibrant cooking videos, comedic sketches, and lifestyle content. With a passionate following across Instagram, TikTok, and YouTube, he blends culinary artistry with humor to engage audiences worldwide.',
  verticals: ['Art', 'Comedy'],
  managedBy: 'Brendan Nahmias',
  platforms: [
    { name: 'Instagram', handle: '@davidalvareeezy', followers: '646.0k', status: 'Expired' as const, color: '#E1306C' },
    { name: 'TikTok', handle: '@davidalvareeezy', followers: '446.3k', status: 'Expired' as const, color: '#25F4EE' },
    { name: 'YouTube', handle: '@davidalvareeezy', followers: '3.22m', status: 'Active' as const, color: '#ff0000' },
  ],
}

export const statsBarData = [
  { label: 'Verified platforms', value: '321', trend: '▼ 3.8%', trendColor: '#ef4444' },
  { label: 'Indexed content', value: '8,028', trend: '▲ 8.2%', trendColor: '#34c0a2' },
  { label: 'Total audience', value: '45.3M', trend: '▲ 12.4%', trendColor: '#34c0a2' },
]

export const metricsData = {
  engagement: { label: 'Engagement Rate', value: '2.4%', sublabel: 'Engagement Rate' },
  reach: { label: 'Avg Story Reach', value: '23.0K', sublabel: 'Avg Story Reach' },
  views: { label: 'Avg Story Views', value: '23.4K', sublabel: 'Avg Story Views' },
}

export const followerGrowthData = {
  title: 'FOLLOWER GROWTH',
  current: '646.1K',
  change: '+134.5K this year',
  months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
}

export const demographicsData = {
  gender: { male: 63, female: 37 },
  countries: [
    { name: 'United States', pct: 77 },
    { name: 'Mexico', pct: 7 },
    { name: 'Brazil', pct: 5 },
    { name: 'India', pct: 3 },
  ],
  ageGroups: [
    { range: '13-17', pct: 6 },
    { range: '18-24', pct: 34 },
    { range: '25-34', pct: 41 },
    { range: '35-44', pct: 12 },
    { range: '45+', pct: 7 },
  ],
}

export const recentActivity = [
  { color: '#34c0a2', text: 'Posted a Reel on May 24. Avg IG views surpassed prior peak by 82%' },
  { color: '#3b82f6', text: 'Majority of the top 10 posts from last year represent collaborations' },
  { color: '#8b5cf6', text: 'YouTube posting cadence is high — ~1 video that was collected through MIJ' },
  { color: '#f59e0b', text: 'Average video length 12+ minutes. Average YouTube views exceeded 500K users' },
]

export const skepticismData = {
  title: 'Engagement Rate — 2.4%',
  formula: 'Total Engagements ÷ Followers = 15,494 ÷ 646,100 = 2.4%',
  source: 'Source: Instagram API · Last 30 days · High confidence',
  comparison: 'Lower than your agency average (3.8%). Includes a viral outlier — without it, engagement is 4.1%.',
}

export const chatMessages = [
  {
    role: 'ai' as const,
    name: 'Foam Assist',
    text: "J. David's engagement rate is 2.4%, calculated as Total Engagements ÷ Followers (15,494 ÷ 646,100). This is lower than your agency average of 3.8%, but includes a viral outlier post from Feb 3. Excluding it, engagement would be 4.1% — above average. Source: Instagram API, last 30 days, high confidence.",
  },
  {
    role: 'user' as const,
    name: 'You',
    text: 'Recalculate using a different engagement formula',
  },
  {
    role: 'ai' as const,
    name: 'Foam Assist',
    text: "Using Reach-based ER instead: Engagements ÷ Avg Reach = 15,494 ÷ 23,000 = 67.4%. This is significantly higher because reach is much smaller than total followers.\n\nView-based ER: 15,494 ÷ 23,400 = 66.2%.\n\nThe standard Follower ER (2.4%) is the industry default, but Reach ER better reflects how engaged his actual audience is.",
  },
]

export const goDeeper = [
  { icon: 'calculator' as const, text: 'Recalculate using a different engagement formula' },
  { icon: 'activity' as const, text: "Compare J. David's engagement to other creators in our agency" },
  { icon: 'trending-up' as const, text: 'Show top-performing posts driving this number' },
]

export const healthScoreData = {
  score: 78,
  subtitle: 'Complete data coverage with all platforms connected',
  coverage: [
    { label: 'IG', count: '1,252' },
    { label: 'TT', count: '12,231' },
    { label: 'YT', count: '4/4' },
  ],
  completion: [
    { label: 'Bio + verticals', pct: 100 },
    { label: 'Audience demographics', pct: 86 },
    { label: 'Content analysis', pct: 72 },
    { label: 'Contact info', pct: 45 },
  ],
}
