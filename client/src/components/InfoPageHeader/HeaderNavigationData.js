import CONSTANTS from '../../constants';
const { SQUADHELP_EMAIL, SQUADHELP_TEL } = CONSTANTS;

export const topHeaderData = [
  {
    id: 1,
    title: 'Account',
    image: 'fas fa-user ',
    items: [
      { id: 1, title: 'Login' },
      { id: 2, title: 'SignUp' },
    ],
  },
  {
    id: 2,
    title: 'Contact',
    image: 'fas fa-phone ',
    items: [
      {
        id: 1,
        title: '(877) 355-3585',
        image: 'fas fa-phone',
        link: `tel:${SQUADHELP_TEL}`,
      },
      { id: 2, title: 'Chat', image: 'fas fa-comment fa-2xs', link: '#' },
      {
        id: 3,
        title: 'Email',
        image: 'fas fa-envelope fa-lg',
        link: `mailto:${SQUADHELP_EMAIL}`,
      },
      { id: 4, title: 'HelpDesc', image: 'fas fa-life-ring fa-2xs', link: '#' },
    ],
  },
  {
    id: 3,
    title: 'Favorites',
    image: 'fas fa-heart ',
    linkPath: '#',
  },
  {
    id: 4,
    image: 'fas fa-bars fa-lg',
    linkPath: '#',
  },
];

export const appMenu = [
  {
    id: 1,
    title: 'Names for sale',
    link: '/premium-domains-for-sale',
    variants: [
      {
        id: 1,
        title: 'Popular Brandable Names',
        link: '#',
      },
      {
        id: 2,
        title: 'Premium Domains For Sale',
        link: '#',
      },
      {
        id: 3,
        title: 'Short Domains',
        link: '#',
        options: [
          { id: 1, title: '3 Letter Domains', link: '#' },
          { id: 2, title: '4 Letter Domains', link: '#' },
          { id: 3, title: '5 Letter Domains', link: '#' },
        ],
      },
      {
        id: 4,
        title: 'One Word Names',
        link: '#',
      },
      {
        id: 5,
        title: 'Industry Domains',
        link: '#',
      },
      {
        id: 6,
        title: 'Location Based Names',
        link: '#',
      },
      {
        id: 7,
        title: 'Recommended For You',
        link: '#',
      },
      {
        id: 8,
        title: 'Become A Seller',
        link: '#',
      },
    ],
  },
  {
    id: 2,
    title: 'Naming contests',
    link: '/branding-marketing-naming-contests',
    variants: [
      {
        id: 1,
        title: 'Naming Contests',
        link: '#',
      },
      {
        id: 2,
        title: 'Start A Contest',
        link: '#',
      },
      {
        id: 3,
        title: 'How It Works',
        link: '#',
      },
      {
        id: 4,
        title: 'Contest Pricing',
        link: '#',
      },
      {
        id: 5,
        title: 'Agency Services',
        link: '#',
      },
      {
        id: 6,
        title: 'Our Work',
        link: '#',
      },
      {
        id: 7,
        title: 'Recent Winners',
        link: '#',
      },
      {
        id: 8,
        title: 'Active Contests',
        link: '#',
      },
      {
        id: 9,
        title: 'Become A Creative',
        link: '#',
      },
    ],
  },
  {
    id: 3,
    title: 'Other services',
    link: '#',
    variants: [
      {
        id: 1,
        title: 'Logos',
        link: '#',
      },
      {
        id: 2,
        title: 'Taglines',
        link: '#',
      },
      {
        id: 3,
        title: 'Audience Testing',
        link: '#',
      },
      {
        id: 4,
        title: 'Trademark Research',
        link: '#',
      },
      {
        id: 5,
        title: 'Brand Identity Design',
        link: '#',
      },
      {
        id: 6,
        title: 'Trademark Filing',
        link: '#',
      },
      {
        id: 7,
        title: 'Video Creation',
        link: '#',
      },
    ],
  },
  {
    id: 4,
    title: 'Agency Experience',
    link: '#',
  },
  {
    id: 5,
    title: 'Resources',
    link: '/',
    variants: [
      {
        id: 1,
        title: 'Resources',
        link: '#',
      },
      {
        id: 2,
        title: 'Business Name Generator',
        link: '#',
      },
      {
        id: 3,
        title: 'Domain Name Generator',
        link: '#',
      },
      {
        id: 4,
        title: 'How to Name Your Business',
        link: '#',
      },
      {
        id: 5,
        title: 'Free Trademark Checker',
        link: '#',
      },
      {
        id: 6,
        title: 'Industry Name Ideas',
        variants: [
          {
            id: 1,
            title: 'Clothing Brand Name Ideas',
            link: '#',
          },
          {
            id: 2,
            title: 'Consulting Business Name Ideas',
            link: '#',
          },
          {
            id: 2,
            title: 'Health & Wellness Business Name Ideas',
            link: '#',
          },
          {
            id: 3,
            title: 'Food Brand Name ideas',
            link: '#',
          },
          {
            id: 4,
            title: 'Beauty Business Names',
            link: '#',
          },

          {
            id: 5,
            title: 'Tech Startup Name Ideas',
            link: '#',
          },
          {
            id: 6,
            title: 'Shopping Website Name Ideas',
            link: '#',
          },
          {
            id: 7,
            title: 'Real Estate Business Name Ideas',
            link: '#',
          },
          {
            id: 8,
            title: 'Insurance Business Name Ideas',
            link: '#',
          },
          {
            id: 9,
            title: 'Finance Business Name Ideas',
            link: '#',
          },
        ],
      },
    ],
  },
];
