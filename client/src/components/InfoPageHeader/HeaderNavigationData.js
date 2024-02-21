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