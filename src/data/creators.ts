export const RECOGNIZED_TERMS = ['Austin', 'kids', 'children', 'lifestyle', 'family', 'fitness'] as const

export type CriteriaStatus = 'match' | 'no-match' | 'partial'

export interface BaseCreator {
  id: string
  name: string
  handle: string
  avatar: string
  verticals: string[]
  location: string
  ig: string
  tt: string
  yt: string
  contentCount: number
  thumbnails: string[]
  note?: { icon: string; quote: string }
  contentCitation?: { icon: string; text: string; color: string }
}

export interface CriterionDef {
  key: string
  label: string
}

export interface EnrichmentDef {
  key: string
  label: string
  platform?: 'ig' | 'tt' | 'yt'
}

export const AVAILABLE_ENRICHMENTS: EnrichmentDef[] = [
  { key: 'igEngRate', label: 'Eng. Rate', platform: 'ig' },
  { key: 'igAvgLikes', label: 'Avg Likes', platform: 'ig' },
  { key: 'ttAvgViews', label: 'Avg Views', platform: 'tt' },
  { key: 'ttEngRate', label: 'Eng. Rate', platform: 'tt' },
  { key: 'ytAvgViews', label: 'Avg Views', platform: 'yt' },
  { key: 'ytSubs', label: 'Subscribers', platform: 'yt' },
  { key: 'brandDeals', label: 'Brand Deals' },
  { key: 'email', label: 'Email' },
  { key: 'manager', label: 'Manager' },
]

export const ENRICHMENT_DATA: Record<string, Record<string, string>> = {
  maya: { igEngRate: '4.2%', igAvgLikes: '8.5K', ttAvgViews: '32K', ttEngRate: '5.8%', ytAvgViews: '4.1K', ytSubs: '12K', brandDeals: '8', email: 'maya@mgmt.co', manager: 'Sarah L.' },
  priya: { igEngRate: '5.1%', igAvgLikes: '6.2K', ttAvgViews: '28K', ttEngRate: '7.3%', ytAvgViews: '9.4K', ytSubs: '28K', brandDeals: '12', email: 'priya@talent.io', manager: 'Alex M.' },
  jess: { igEngRate: '3.8%', igAvgLikes: '12K', ttAvgViews: '45K', ttEngRate: '4.1%', ytAvgViews: '18K', ytSubs: '95K', brandDeals: '15', email: 'jess@fit.co', manager: 'Mike R.' },
  lena: { igEngRate: '6.3%', igAvgLikes: '4.8K', ttAvgViews: '18K', ttEngRate: '8.2%', ytAvgViews: '52K', ytSubs: '245K', brandDeals: '5', email: 'lena@diy.me', manager: '—' },
  carlos: { igEngRate: '2.9%', igAvgLikes: '11K', ttAvgViews: '120K', ttEngRate: '3.4%', ytAvgViews: '85K', ytSubs: '1.2M', brandDeals: '22', email: 'carlos@tech.gg', manager: 'David K.' },
  aisha: { igEngRate: '3.4%', igAvgLikes: '28K', ttAvgViews: '85K', ttEngRate: '4.7%', ytAvgViews: '42K', ytSubs: '340K', brandDeals: '30', email: 'aisha@glam.co', manager: 'Jen P.' },
  derek: { igEngRate: '4.7%', igAvgLikes: '7.8K', ttAvgViews: '22K', ttEngRate: '5.2%', ytAvgViews: '14K', ytSubs: '78K', brandDeals: '9', email: 'derek@food.tv', manager: '—' },
  nina: { igEngRate: '5.5%', igAvgLikes: '14K', ttAvgViews: '35K', ttEngRate: '6.1%', ytAvgViews: '8.2K', ytSubs: '55K', brandDeals: '7', email: 'nina@well.co', manager: 'Chris T.' },
  marcus: { igEngRate: '3.1%', igAvgLikes: '4.2K', ttAvgViews: '52K', ttEngRate: '4.9%', ytAvgViews: '15K', ytSubs: '92K', brandDeals: '11', email: 'marcus@fit.co', manager: 'Sarah L.' },
  sophie: { igEngRate: '7.2%', igAvgLikes: '5.1K', ttAvgViews: '15K', ttEngRate: '9.4%', ytAvgViews: '62K', ytSubs: '410K', brandDeals: '4', email: 'sophie@edu.io', manager: '—' },
  tyler: { igEngRate: '2.6%', igAvgLikes: '12K', ttAvgViews: '78K', ttEngRate: '3.8%', ytAvgViews: '22K', ytSubs: '150K', brandDeals: '18', email: 'tyler@adv.co', manager: 'Pat M.' },
  rachel: { igEngRate: '3.9%', igAvgLikes: '25K', ttAvgViews: '92K', ttEngRate: '5.3%', ytAvgViews: '35K', ytSubs: '230K', brandDeals: '25', email: 'rachel@beauty.co', manager: 'Jen P.' },
  jordan: { igEngRate: '4.8%', igAvgLikes: '9.1K', ttAvgViews: '38K', ttEngRate: '6.7%', ytAvgViews: '6.8K', ytSubs: '45K', brandDeals: '6', email: 'jordan@style.co', manager: '—' },
  emma: { igEngRate: '5.8%', igAvgLikes: '14K', ttAvgViews: '42K', ttEngRate: '7.1%', ytAvgViews: '78K', ytSubs: '520K', brandDeals: '10', email: 'emma@home.co', manager: 'Lisa W.' },
  omar: { igEngRate: '2.3%', igAvgLikes: '7.5K', ttAvgViews: '65K', ttEngRate: '3.2%', ytAvgViews: '95K', ytSubs: '680K', brandDeals: '14', email: 'omar@biz.co', manager: 'David K.' },
  mia: { igEngRate: '4.1%', igAvgLikes: '22K', ttAvgViews: '55K', ttEngRate: '5.6%', ytAvgViews: '18K', ytSubs: '120K', brandDeals: '16', email: 'mia@travel.co', manager: 'Alex M.' },
  ben: { igEngRate: '8.5%', igAvgLikes: '8.2K', ttAvgViews: '210K', ttEngRate: '11.2%', ytAvgViews: '48K', ytSubs: '340K', brandDeals: '3', email: 'ben@comedy.co', manager: '—' },
}

export const CRITERION_COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#ec4899']

export type ReferenceType = 'ig' | 'tt' | 'yt' | 'web' | 'note' | 'email' | 'linkedin' | 'maps'

export interface CriterionResult {
  status: CriteriaStatus
  value: string
  source: string
  sourceColor: string
  reasoning: string
  references: ReferenceType[]
}

export interface CreatorEvaluation {
  creatorId: string
  score: number
  criteria: Record<string, CriterionResult>
  analysis: {
    scoreLabel: string
    scoreColor: string
    scoreBg: string
    description: string
  }
}

export const QUERY_CRITERIA: CriterionDef[] = [
  { key: 'lifestyleFit', label: 'Lifestyle Fit' },
  { key: 'hasChildren', label: 'Has Children' },
  { key: 'basedInAustin', label: 'Based in Austin' },
]

export const allCreators: BaseCreator[] = [
  {
    id: 'maya',
    name: 'Maya Torres',
    handle: '@mayatorres',
    avatar: 'https://images.unsplash.com/photo-1656350703134-3411d026f397?w=200&h=200&fit=crop',
    verticals: ['Lifestyle', 'Family'],
    location: 'Austin, TX',
    ig: '285K',
    tt: '92K',
    yt: '12K',
    contentCount: 12,
    thumbnails: [
      'https://images.unsplash.com/photo-1758874960462-bc5c1d2adeb9?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1758274526093-23bc5136933f?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1714392527749-4ab57e090083?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1685358268305-c621b38e75d8?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1673515325568-2baac75324c8?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1760425646193-ac3423ccafee?w=200&h=200&fit=crop',
    ],
    note: {
      icon: 'notebook-pen',
      quote: '"Maya mentioned in our last call she had her daughter in June. Wants to do more family-friendly brand work." — Marcus Chen, Sep 2025',
    },
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    handle: '@priyasharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    verticals: ['Family', 'Parenting'],
    location: 'Austin, TX',
    ig: '142K',
    tt: '310K',
    yt: '28K',
    contentCount: 8,
    thumbnails: [
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1455426958498-18ebbb3bb21c?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'jess',
    name: 'Jess Caldwell',
    handle: '@jesscaldwell',
    avatar: 'https://images.unsplash.com/photo-1675910518245-04081dc44b5f?w=200&h=200&fit=crop',
    verticals: ['Wellness', 'Fitness'],
    location: 'Austin, TX',
    ig: '410K',
    tt: '185K',
    yt: '95K',
    contentCount: 15,
    thumbnails: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'lena',
    name: 'Lena Morin',
    handle: '@lenamorin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    verticals: ['Parenting', 'DIY'],
    location: 'Round Rock, TX',
    ig: '98K',
    tt: '45K',
    yt: '245K',
    contentCount: 22,
    thumbnails: [
      'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop',
    ],
    contentCitation: {
      icon: 'video',
      text: '"Shot at Zilker Park, Austin" — TikTok, uploaded Nov 2025',
      color: '#3b82f6',
    },
  },
  // --- 14 additional creators ---
  {
    id: 'carlos',
    name: 'Carlos Mendes',
    handle: '@carlosmendes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    verticals: ['Tech', 'Gaming'],
    location: 'Austin, TX',
    ig: '520K',
    tt: '890K',
    yt: '1.2M',
    contentCount: 34,
    thumbnails: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'aisha',
    name: 'Aisha Williams',
    handle: '@aishawilliams',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop',
    verticals: ['Fashion', 'Beauty'],
    location: 'Los Angeles, CA',
    ig: '1.1M',
    tt: '670K',
    yt: '340K',
    contentCount: 28,
    thumbnails: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'derek',
    name: 'Derek Huang',
    handle: '@derekhuang',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    verticals: ['Food', 'Travel'],
    location: 'Houston, TX',
    ig: '215K',
    tt: '145K',
    yt: '78K',
    contentCount: 19,
    thumbnails: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'nina',
    name: 'Nina Petrova',
    handle: '@ninapetrova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    verticals: ['Lifestyle', 'Wellness'],
    location: 'Dallas, TX',
    ig: '340K',
    tt: '210K',
    yt: '55K',
    contentCount: 16,
    thumbnails: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'marcus',
    name: 'Marcus Reed',
    handle: '@marcusreed',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    verticals: ['Fitness', 'Lifestyle'],
    location: 'Austin, TX',
    ig: '178K',
    tt: '430K',
    yt: '92K',
    contentCount: 20,
    thumbnails: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'sophie',
    name: 'Sophie Liu',
    handle: '@sophieliu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    verticals: ['Education', 'Parenting'],
    location: 'San Francisco, CA',
    ig: '89K',
    tt: '125K',
    yt: '410K',
    contentCount: 11,
    thumbnails: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'tyler',
    name: 'Tyler Brooks',
    handle: '@tylerbrooks',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    verticals: ['Outdoors', 'Adventure'],
    location: 'Denver, CO',
    ig: '620K',
    tt: '280K',
    yt: '150K',
    contentCount: 25,
    thumbnails: [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'rachel',
    name: 'Rachel Kim',
    handle: '@rachelkim',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    verticals: ['Beauty', 'Skincare'],
    location: 'New York, NY',
    ig: '890K',
    tt: '520K',
    yt: '230K',
    contentCount: 31,
    thumbnails: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'jordan',
    name: 'Jordan Park',
    handle: '@jordanpark',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
    verticals: ['Lifestyle', 'Fashion'],
    location: 'Austin, TX',
    ig: '245K',
    tt: '380K',
    yt: '45K',
    contentCount: 14,
    thumbnails: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'emma',
    name: 'Emma Davis',
    handle: '@emmadavis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    verticals: ['Home', 'DIY'],
    location: 'Nashville, TN',
    ig: '310K',
    tt: '175K',
    yt: '520K',
    contentCount: 18,
    thumbnails: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'omar',
    name: 'Omar Hassan',
    handle: '@omarhassan',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    verticals: ['Finance', 'Business'],
    location: 'Chicago, IL',
    ig: '450K',
    tt: '320K',
    yt: '680K',
    contentCount: 27,
    thumbnails: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'mia',
    name: 'Mia Chen',
    handle: '@miachen',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    verticals: ['Travel', 'Lifestyle'],
    location: 'Miami, FL',
    ig: '780K',
    tt: '490K',
    yt: '120K',
    contentCount: 23,
    thumbnails: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'ben',
    name: 'Ben Nakamura',
    handle: '@bennakamura',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop',
    verticals: ['Comedy', 'Entertainment'],
    location: 'Portland, OR',
    ig: '125K',
    tt: '1.5M',
    yt: '340K',
    contentCount: 42,
    thumbnails: [
      'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=200&h=200&fit=crop',
    ],
  },
]

export const EVALUATIONS: CreatorEvaluation[] = [
  {
    creatorId: 'maya', score: 92,
    criteria: {
      lifestyleFit: { status: 'match', value: 'Lifestyle', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Maya\'s Instagram bio lists "lifestyle + family content creator." Her last 20 posts include home tours, daily routines, and family product reviews — all core lifestyle categories.', references: ['ig', 'tt', 'web'] },
      hasChildren: { status: 'match', value: 'Personal Note', source: 'Personal Note', sourceColor: '#8b5cf6', reasoning: 'A personal note from Marcus Chen (Sep 2025) confirms Maya had her daughter in June. Multiple recent Instagram stories also show infant content.', references: ['note', 'ig'] },
      basedInAustin: { status: 'match', value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Instagram profile lists Austin, TX. Geo-tagged posts from South Congress, Barton Springs, and other Austin landmarks confirm active local presence.', references: ['ig', 'maps', 'tt'] },
    },
    analysis: { scoreLabel: 'Strong match · 92/100', scoreColor: '#34c0a2', scoreBg: '#34c0a220', description: 'Maya creates lifestyle and family content from Austin. A personal note from Marcus Chen confirms she had her daughter in June 2025 and is interested in family-friendly brand work.' },
  },
  {
    creatorId: 'priya', score: 87,
    criteria: {
      lifestyleFit: { status: 'match', value: 'Family', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Priya\'s content is centered on family and parenting. Her TikTok and YouTube channels feature parenting tips, family vlogs, and kid-friendly recipes — all lifestyle-adjacent.', references: ['ig', 'tt', 'yt'] },
      hasChildren: { status: 'match', value: 'Content Data', source: 'Content', sourceColor: '#3b82f6', reasoning: 'Priya openly shares about her two children across all platforms. Recent TikToks feature her kids in back-to-school content and family weekend vlogs.', references: ['tt', 'ig', 'yt'] },
      basedInAustin: { status: 'match', value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Profile location set to Austin, TX. Content geo-tags at local parks, restaurants, and Austin community events.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Strong match · 87/100', scoreColor: '#34c0a2', scoreBg: '#34c0a220', description: 'Priya focuses on parenting and family content from Austin. Openly shares about her two children in content across all platforms.' },
  },
  {
    creatorId: 'jess', score: 74,
    criteria: {
      lifestyleFit: { status: 'match', value: 'Wellness', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Jess creates wellness and fitness content including workout routines, healthy meal prep, and mindfulness practices. Bio reads "helping you live your best life" — strong lifestyle alignment.', references: ['ig', 'tt', 'yt', 'web'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'Searched across all social profiles, personal notes, and 15 recent pieces of content. No mention of children, pregnancy, or parenting in any data source.', references: ['ig', 'tt', 'yt', 'note'] },
      basedInAustin: { status: 'match', value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Instagram and TikTok profiles both list Austin. Frequent content at Lady Bird Lake and local Austin gyms confirms active presence.', references: ['ig', 'tt', 'maps'] },
    },
    analysis: { scoreLabel: 'Partial match · 74/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Jess is a wellness and fitness creator based in Austin. No evidence of children found in profile data, personal notes, or content analysis.' },
  },
  {
    creatorId: 'lena', score: 68,
    criteria: {
      lifestyleFit: { status: 'match', value: 'Parenting', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Lena\'s content is primarily parenting and DIY focused. Her YouTube channel features kid craft tutorials and family home projects — directly relevant to lifestyle.', references: ['yt', 'ig', 'tt'] },
      hasChildren: { status: 'match', value: 'Content', source: 'Content', sourceColor: '#3b82f6', reasoning: 'Multiple TikToks and YouTube videos feature her two kids. Recent content includes school lunch prep and weekend family activities.', references: ['tt', 'yt', 'ig'] },
      basedInAustin: { status: 'partial', value: 'Round Rock, TX', source: 'Partial', sourceColor: '#f59e0b', reasoning: 'Profile lists Round Rock, TX — approximately 20 miles north of Austin. TikTok content geo-tags at Zilker Park and other Austin locations, suggesting she frequents the metro area.', references: ['ig', 'tt', 'maps'] },
    },
    analysis: { scoreLabel: 'Partial match · 68/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Lena is a parenting and DIY creator. Content confirms she has 2 kids. Based in Round Rock, TX — TikTok content cites Austin-area locations.' },
  },
  {
    creatorId: 'marcus', score: 65,
    criteria: {
      lifestyleFit: { status: 'match', value: 'Fitness + Lifestyle', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Marcus creates fitness and lifestyle content. Instagram features workout content interspersed with daily life, morning routines, and lifestyle product reviews.', references: ['ig', 'tt', 'yt'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'Reviewed all social profiles and 20 recent posts. No mention of children or family beyond fitness buddy content. No personal notes on file.', references: ['ig', 'tt', 'yt'] },
      basedInAustin: { status: 'match', value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'All profiles list Austin, TX. Regularly posts from Austin fitness studios and local trails.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Partial match · 65/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Marcus is a fitness and lifestyle creator based in Austin. Strong lifestyle fit, but no evidence of children in any data source.' },
  },
  {
    creatorId: 'jordan', score: 66,
    criteria: {
      lifestyleFit: { status: 'match', value: 'Lifestyle + Fashion', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Jordan blends lifestyle and fashion content. TikTok features OOTD, apartment tours, and Austin local guides — clearly lifestyle-oriented.', references: ['tt', 'ig'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No references to children found across 30+ analyzed posts and all social bios. Content focuses on personal style and social life.', references: ['ig', 'tt'] },
      basedInAustin: { status: 'match', value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Bio lists Austin. Content heavily features Austin locations including Rainey Street, East 6th, and local boutiques.', references: ['ig', 'tt', 'maps'] },
    },
    analysis: { scoreLabel: 'Partial match · 66/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Jordan is a lifestyle and fashion creator based in Austin. Strong local presence but no evidence of children.' },
  },
  {
    creatorId: 'nina', score: 55,
    criteria: {
      lifestyleFit: { status: 'match', value: 'Lifestyle + Wellness', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Nina creates lifestyle and wellness content covering daily routines, skincare, and mindful living. Strong alignment with the lifestyle category.', references: ['ig', 'tt'] },
      hasChildren: { status: 'partial', value: 'Mentioned nieces', source: 'Content', sourceColor: '#3b82f6', reasoning: 'Two TikToks feature young children identified as her nieces. No direct evidence of her own children. Family content is present but not as a parent.', references: ['tt', 'ig'] },
      basedInAustin: { status: 'no-match', value: 'Dallas, TX', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'All profiles consistently list Dallas, TX. No geo-tagged content from Austin found in recent 50 posts.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Weak match · 55/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Nina creates lifestyle and wellness content from Dallas. Mentions nieces in content but no children of her own confirmed.' },
  },
  {
    creatorId: 'sophie', score: 52,
    criteria: {
      lifestyleFit: { status: 'partial', value: 'Education', source: 'Profile Data', sourceColor: '#f59e0b', reasoning: 'Sophie\'s primary focus is education and parenting tips. While not pure lifestyle content, the parenting angle overlaps significantly with lifestyle audiences.', references: ['yt', 'ig'] },
      hasChildren: { status: 'match', value: 'Content Data', source: 'Content', sourceColor: '#3b82f6', reasoning: 'YouTube channel prominently features her son in educational content. Recent videos include "learning activities for toddlers" and school readiness series.', references: ['yt', 'ig', 'tt'] },
      basedInAustin: { status: 'no-match', value: 'San Francisco, CA', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Profile and website both list San Francisco. All geo-tagged content is from the Bay Area.', references: ['ig', 'web', 'maps'] },
    },
    analysis: { scoreLabel: 'Weak match · 52/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Sophie is an education and parenting creator in San Francisco. Has children but is not based in Austin.' },
  },
  {
    creatorId: 'emma', score: 48,
    criteria: {
      lifestyleFit: { status: 'partial', value: 'Home + DIY', source: 'Profile Data', sourceColor: '#f59e0b', reasoning: 'Emma focuses on home decor and DIY projects. Adjacent to lifestyle but more niche — her audience overlaps with lifestyle but content is primarily project-based.', references: ['ig', 'yt', 'web'] },
      hasChildren: { status: 'match', value: 'Content Data', source: 'Content', sourceColor: '#3b82f6', reasoning: 'Children appear in multiple YouTube videos and Instagram stories. Recent content includes "kid-friendly room makeover" and family DIY projects.', references: ['yt', 'ig'] },
      basedInAustin: { status: 'no-match', value: 'Nashville, TN', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'All profiles list Nashville, TN. Content consistently features Nashville home and local hardware stores.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Weak match · 48/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Emma creates home and DIY content from Nashville. Has children visible in content. Home/DIY is adjacent to lifestyle.' },
  },
  {
    creatorId: 'derek', score: 42,
    criteria: {
      lifestyleFit: { status: 'partial', value: 'Food + Travel', source: 'Profile Data', sourceColor: '#f59e0b', reasoning: 'Derek creates food reviews and travel content. Food/travel is lifestyle-adjacent but his content leans more toward restaurant reviews than daily life.', references: ['ig', 'tt', 'yt'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No children referenced in any content or profile. Content style is focused on solo dining and travel experiences.', references: ['ig', 'tt'] },
      basedInAustin: { status: 'partial', value: 'Houston, TX', source: 'Profile Data', sourceColor: '#f59e0b', reasoning: 'Based in Houston, TX — same state but 165 miles from Austin. Has visited Austin for food content but not based there.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Weak match · 42/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Derek is a food and travel creator in Houston. Texas-based but not Austin. No children.' },
  },
  {
    creatorId: 'mia', score: 40,
    criteria: {
      lifestyleFit: { status: 'match', value: 'Travel + Lifestyle', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Mia\'s content blends travel with lifestyle — hotel reviews, packing guides, and daily routines while traveling. Clearly in the lifestyle space.', references: ['ig', 'tt', 'yt'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No children content found. Travel-focused lifestyle suggests no dependents based on frequency and spontaneity of trips.', references: ['ig', 'tt'] },
      basedInAustin: { status: 'no-match', value: 'Miami, FL', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'All profiles list Miami, FL. Geo-tags are predominantly Miami Beach and South Florida. No Austin content found.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Weak match · 40/100', scoreColor: '#f59e0b', scoreBg: '#f59e0b20', description: 'Mia has strong lifestyle content but is based in Miami with no children evidence.' },
  },
  {
    creatorId: 'carlos', score: 30,
    criteria: {
      lifestyleFit: { status: 'no-match', value: 'Tech + Gaming', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Content is exclusively tech reviews and gaming streams. No lifestyle, daily routine, or personal life content found across any platform.', references: ['yt', 'tt', 'ig'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No personal or family content. All posts are product-focused tech reviews and gaming content.', references: ['ig', 'yt'] },
      basedInAustin: { status: 'match', value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2', reasoning: 'Profile lists Austin, TX. Has mentioned the Austin tech scene in videos and attends local SXSW events.', references: ['yt', 'ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Low match · 30/100', scoreColor: '#ef4444', scoreBg: '#ef444420', description: 'Carlos is a tech and gaming creator based in Austin. No lifestyle or family content.' },
  },
  {
    creatorId: 'aisha', score: 25,
    criteria: {
      lifestyleFit: { status: 'partial', value: 'Fashion + Beauty', source: 'Profile Data', sourceColor: '#f59e0b', reasoning: 'Fashion and beauty are lifestyle-adjacent but Aisha\'s content is more industry/editorial focused than personal lifestyle content.', references: ['ig', 'tt'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No personal or family content across any platform. Content is exclusively brand and editorial focused.', references: ['ig', 'tt'] },
      basedInAustin: { status: 'no-match', value: 'Los Angeles, CA', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'All profiles list Los Angeles. Content features LA studios, events, and locations exclusively.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Low match · 25/100', scoreColor: '#ef4444', scoreBg: '#ef444420', description: 'Aisha is a fashion and beauty creator in LA. No children and not in Austin.' },
  },
  {
    creatorId: 'tyler', score: 20,
    criteria: {
      lifestyleFit: { status: 'no-match', value: 'Outdoors', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Tyler\'s content is adventure and outdoors focused — hiking, climbing, camping. Not aligned with the lifestyle category as typically defined.', references: ['ig', 'yt'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No family content. All posts feature solo or buddy adventure trips.', references: ['ig', 'yt'] },
      basedInAustin: { status: 'no-match', value: 'Denver, CO', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Based in Denver, CO. Content features Colorado Rockies and Pacific Northwest locations.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Low match · 20/100', scoreColor: '#ef4444', scoreBg: '#ef444420', description: 'Tyler is an outdoors creator in Denver. No overlap with lifestyle, children, or Austin.' },
  },
  {
    creatorId: 'rachel', score: 18,
    criteria: {
      lifestyleFit: { status: 'partial', value: 'Beauty + Skincare', source: 'Profile Data', sourceColor: '#f59e0b', reasoning: 'Beauty and skincare overlap with lifestyle audiences but Rachel\'s content is primarily product reviews and tutorials, less personal lifestyle.', references: ['ig', 'yt'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No children or family content found. Personal content is limited to beauty routines.', references: ['ig', 'tt'] },
      basedInAustin: { status: 'no-match', value: 'New York, NY', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Based in New York City. All content features NYC apartments, studios, and events.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Low match · 18/100', scoreColor: '#ef4444', scoreBg: '#ef444420', description: 'Rachel is a beauty creator in New York. No lifestyle, children, or Austin match.' },
  },
  {
    creatorId: 'omar', score: 12,
    criteria: {
      lifestyleFit: { status: 'no-match', value: 'Finance', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Omar\'s content is exclusively finance and business — stock analysis, entrepreneurship tips, and business podcasts. No lifestyle alignment.', references: ['yt', 'ig', 'linkedin'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No personal or family content. LinkedIn and social profiles are purely professional.', references: ['linkedin', 'ig'] },
      basedInAustin: { status: 'no-match', value: 'Chicago, IL', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Based in Chicago, IL per all profiles and LinkedIn. Content references Chicago business community.', references: ['ig', 'linkedin', 'maps'] },
    },
    analysis: { scoreLabel: 'Low match · 12/100', scoreColor: '#ef4444', scoreBg: '#ef444420', description: 'Omar is a finance creator in Chicago. No overlap with any search criteria.' },
  },
  {
    creatorId: 'ben', score: 10,
    criteria: {
      lifestyleFit: { status: 'no-match', value: 'Comedy', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Ben creates comedy skits and entertainment content. While viral, none of it overlaps with lifestyle, family, or personal content categories.', references: ['tt', 'yt'] },
      hasChildren: { status: 'no-match', value: 'No evidence', source: 'Not found', sourceColor: '#54657d', reasoning: 'No personal content beyond comedy performances. No family or children references found.', references: ['tt', 'ig'] },
      basedInAustin: { status: 'no-match', value: 'Portland, OR', source: 'Profile Data', sourceColor: '#54657d', reasoning: 'Based in Portland, OR. Comedy content filmed at Portland venues and local spots.', references: ['ig', 'maps'] },
    },
    analysis: { scoreLabel: 'Low match · 10/100', scoreColor: '#ef4444', scoreBg: '#ef444420', description: 'Ben is a comedy creator in Portland. No overlap with any search criteria.' },
  },
]
