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

export const investigationSteps = [
  { text: 'Checking Instagram connection status...', result: 'Connected', delay: 600 },
  { text: 'Pulling metric sources from authenticated API...', result: '3 endpoints', delay: 550 },
  { text: 'Analyzing engagement rate formulas...', result: '3 different calculations found', delay: 650 },
  { text: 'Comparing average periods...', result: '30-day vs 90-day variance detected', delay: 600 },
]

export const goDeeper = [
  { icon: 'calculator' as const, text: 'Recalculate using a different engagement formula' },
  { icon: 'activity' as const, text: "Compare J. David's engagement to other creators in our agency" },
  { icon: 'trending-up' as const, text: 'Show top-performing posts driving this number' },
]

export type MetricKey = 'engagement' | 'reach' | 'growth' | 'views'

export const metricExplanations: Record<
  MetricKey,
  {
    label: string
    value: string
    investigationSteps: { text: string; result: string; delay: number }[]
    explanation: {
      hook: string
      sections: { type: 'formula' | 'breakdown' | 'source' | 'insight'; icon?: string; text: string }[]
      nudge: { question: string }
      aiReply: string
    }
  }
> = {
  engagement: {
    label: 'Engagement Rate',
    value: '2.4%',
    investigationSteps: [
      { text: 'Connecting to Instagram API...', result: 'Authenticated', delay: 500 },
      { text: 'Pulling engagement data for last 30 days...', result: '15,494 total engagements', delay: 600 },
      { text: 'Calculating rate across 3 formulas...', result: 'Follower, Reach, and View-based', delay: 650 },
      { text: 'Comparing to agency benchmarks...', result: 'Below 3.8% average', delay: 550 },
    ],
    explanation: {
      hook: "2.4% looks low — but it's not the full picture.",
      sections: [
        { type: 'formula', text: 'Total Engagements ÷ Followers = 15,494 ÷ 646,100' },
        { type: 'source', text: 'Instagram API · Last 30 days · High confidence' },
        {
          type: 'insight',
          text: "A viral post from Feb 3 is dragging the average down. Remove that outlier and engagement jumps to 4.1% — above your agency's 3.8% benchmark.",
        },
      ],
      nudge: {
        question: 'Recalculate using a different engagement formula',
      },
      aiReply: "J. David's engagement rate is 2.4%, calculated as Total Engagements ÷ Followers (15,494 ÷ 646,100). This is lower than your agency average of 3.8%, but includes a viral outlier post from Feb 3. Excluding it, engagement would be 4.1% — above average. Source: Instagram API, last 30 days, high confidence.",
    },
  },
  reach: {
    label: 'Avg Story Reach',
    value: '23.0K',
    investigationSteps: [
      { text: 'Connecting to Instagram Insights...', result: 'Authenticated', delay: 500 },
      { text: 'Pulling story impression data...', result: '142 stories in last 30 days', delay: 650 },
      { text: 'Calculating unique viewer averages...', result: '23,012 avg unique viewers', delay: 600 },
      { text: 'Analyzing month-over-month trend...', result: 'Declining trend detected', delay: 550 },
    ],
    explanation: {
      hook: '23K viewers per story — solid for an account this size.',
      sections: [
        { type: 'formula', text: 'Sum of unique story viewers ÷ Number of stories' },
        { type: 'source', text: 'Instagram Insights API · Last 30 days' },
        {
          type: 'insight',
          text: "That's 3.6% of total followers, which is typical for accounts over 500K. But reach has been declining ~8% month-over-month since story frequency dropped from 5/week to 2/week.",
        },
      ],
      nudge: {
        question: 'Why is story reach declining month over month?',
      },
      aiReply: "Reach dropped from ~28K to ~23K over the last 3 months, tracking closely with posting frequency. David went from 5 stories/week to 2 stories/week in that period. Instagram's algorithm deprioritizes accounts with irregular posting — fewer stories means fewer impressions in the story tray. The audience is still there, but they're seeing him less often.",
    },
  },
  growth: {
    label: 'Follower Growth',
    value: '+134.5K',
    investigationSteps: [
      { text: 'Connecting to Instagram Graph API...', result: 'Authenticated', delay: 500 },
      { text: 'Pulling follower count history...', result: '+134.5K year-to-date', delay: 650 },
      { text: 'Analyzing monthly growth rate...', result: 'Slowing since Q2', delay: 600 },
      { text: 'Comparing to category benchmarks...', result: 'Above avg for Food/Comedy', delay: 550 },
    ],
    explanation: {
      hook: '+134.5K this year — strong for Instagram, but the pace is slowing.',
      sections: [
        { type: 'formula', text: 'Current followers − Jan 1 followers = 646.1K − 511.6K' },
        { type: 'source', text: 'Instagram Graph API · Year-to-date · High confidence' },
        {
          type: 'insight',
          text: 'Growth was front-loaded — 89K came in Q1 (driven by a viral Reel series in February). Q2 and Q3 combined added only 45.5K. The monthly growth rate has dropped from ~30K/mo to ~15K/mo.',
        },
      ],
      nudge: {
        question: 'What caused the growth spike in Q1?',
      },
      aiReply: "The Q1 spike was driven almost entirely by a 3-part Reel series posted in February that went viral (2.1M, 1.8M, and 1.4M views). Those Reels appeared on Explore and Reels tab for ~2 weeks, pulling in ~89K new followers. Since then, no single post has broken 500K views, which explains the slowdown to ~15K/mo.",
    },
  },
  views: {
    label: 'Avg Story Views',
    value: '23.4K',
    investigationSteps: [
      { text: 'Connecting to IG Insights...', result: 'Authenticated', delay: 500 },
      { text: 'Pulling story view counts...', result: '142 stories analyzed', delay: 600 },
      { text: 'Calculating average views per story...', result: '23,412 avg views', delay: 650 },
      { text: 'Comparing views-to-reach ratio...', result: '1.02x — unusually close', delay: 550 },
    ],
    explanation: {
      hook: '23.4K views per story — nearly identical to reach, which is unusual.',
      sections: [
        { type: 'formula', text: 'Total story views ÷ Number of stories posted = 3,324,504 ÷ 142' },
        { type: 'source', text: 'Instagram Insights API · Last 30 days · High confidence' },
        {
          type: 'insight',
          text: 'Views (23.4K) and reach (23.0K) are within 2% — almost no rewatching. Typical accounts see 1.3–1.5x views-to-reach. This suggests his stories are seen once and swiped past, not replayed.',
        },
      ],
      nudge: {
        question: 'How can he increase story replay rate?',
      },
      aiReply: "A 1.02x views-to-reach ratio means almost nobody is rewatching. For context, engaging story formats like tutorials, before/afters, and multi-part narratives typically hit 1.3–1.5x. David's stories are mostly single-frame reposts. Adding interactive elements (polls, quizzes, countdowns) and serialized content would give viewers a reason to come back and rewatch.",
    },
  },
}

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
