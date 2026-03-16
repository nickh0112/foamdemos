export type CriteriaStatus = 'match' | 'no-match' | 'partial'

export interface Creator {
  id: string
  name: string
  handle: string
  avatar: string
  score: number
  verticals: string[]
  location: string
  ig: string
  tt: string
  yt: string
  contentCount: number
  thumbnails: string[]
  lifestyleFit: CriteriaStatus
  hasChildren: CriteriaStatus
  basedInAustin: CriteriaStatus
  analysis: {
    scoreLabel: string
    scoreColor: string
    scoreBg: string
    description: string
  }
  matching: {
    lifestyleFit: { value: string; source: string; sourceColor: string }
    hasChildren: { value: string; source: string; sourceColor: string }
    basedInAustin: { value: string; source: string; sourceColor: string }
  }
  note?: {
    icon: string
    quote: string
  }
  contentCitation?: {
    icon: string
    text: string
    color: string
  }
}

export const creators: Creator[] = [
  {
    id: 'maya',
    name: 'Maya Torres',
    handle: '@mayatorres',
    avatar: 'https://images.unsplash.com/photo-1656350703134-3411d026f397?w=200&h=200&fit=crop',
    score: 92,
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
      'https://images.unsplash.com/photo-1710052809051-8d5ccfa52f5f?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1713256595315-07d280819a8c?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1768276000822-f02a3fd1dd60?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1639389827174-2a4be06dcaae?w=200&h=200&fit=crop',
    ],
    lifestyleFit: 'match',
    hasChildren: 'match',
    basedInAustin: 'match',
    analysis: {
      scoreLabel: 'Good match · 92/100',
      scoreColor: '#34c0a2',
      scoreBg: '#34c0a220',
      description: 'Maya creates lifestyle and family content from Austin. A personal note from Marcus Chen confirms she had her daughter in June 2025 and is interested in family-friendly brand work.',
    },
    matching: {
      lifestyleFit: { value: 'Lifestyle', source: 'Profile Data', sourceColor: '#34c0a2' },
      hasChildren: { value: 'Personal Note', source: 'Personal Note', sourceColor: '#8b5cf6' },
      basedInAustin: { value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2' },
    },
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
    score: 87,
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
    lifestyleFit: 'match',
    hasChildren: 'match',
    basedInAustin: 'match',
    analysis: {
      scoreLabel: 'Good match · 87/100',
      scoreColor: '#34c0a2',
      scoreBg: '#34c0a220',
      description: 'Priya focuses on parenting and family content from Austin. Openly shares about her two children in content across all platforms.',
    },
    matching: {
      lifestyleFit: { value: 'Family', source: 'Profile Data', sourceColor: '#34c0a2' },
      hasChildren: { value: 'Content Data', source: 'Content', sourceColor: '#3b82f6' },
      basedInAustin: { value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2' },
    },
  },
  {
    id: 'jess',
    name: 'Jess Caldwell',
    handle: '@jesscaldwell',
    avatar: 'https://images.unsplash.com/photo-1675910518245-04081dc44b5f?w=200&h=200&fit=crop',
    score: 74,
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
    lifestyleFit: 'match',
    hasChildren: 'no-match',
    basedInAustin: 'match',
    analysis: {
      scoreLabel: 'Partial match · 74/100',
      scoreColor: '#f59e0b',
      scoreBg: '#f59e0b20',
      description: "Jess is a wellness and fitness creator based in Austin. No evidence of children found in profile data, personal notes, or content analysis. Strong lifestyle fit otherwise.",
    },
    matching: {
      lifestyleFit: { value: 'Wellness', source: 'Profile Data', sourceColor: '#34c0a2' },
      hasChildren: { value: 'No evidence', source: 'Not found', sourceColor: '#54657d' },
      basedInAustin: { value: 'Austin, TX', source: 'Profile Data', sourceColor: '#34c0a2' },
    },
  },
  {
    id: 'lena',
    name: 'Lena Morin',
    handle: '@lenamorin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    score: 68,
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
    lifestyleFit: 'match',
    hasChildren: 'match',
    basedInAustin: 'partial',
    analysis: {
      scoreLabel: 'Possible match · 68/100',
      scoreColor: '#f59e0b',
      scoreBg: '#f59e0b20',
      description: "Lena is a parenting and DIY creator. Content confirms she has 2 kids. Based in Round Rock, TX (outside Austin metro) — TikTok content cites Austin-area locations, Instagram bio says Round Rock.",
    },
    matching: {
      lifestyleFit: { value: 'Parenting', source: 'Profile Data', sourceColor: '#34c0a2' },
      hasChildren: { value: 'Content', source: 'Content', sourceColor: '#3b82f6' },
      basedInAustin: { value: 'Round Rock, TX', source: 'Partial', sourceColor: '#f59e0b' },
    },
    contentCitation: {
      icon: 'video',
      text: '"Shot at Zilker Park, Austin" — TikTok, uploaded Nov 2025',
      color: '#3b82f6',
    },
  },
]
