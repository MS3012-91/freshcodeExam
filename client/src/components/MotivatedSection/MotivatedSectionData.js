import CONSTANTS from '../../constants';

export const bannerElements = [
  {
    id: 1,
    alt: 'startBannerImage',
    src: CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/startBannerImage.svg',
  },
  {
    id: 2,
    alt: 'endBannerImage',
    src: CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/endBannerImage.svg',
  },
];

export const cardsData = [
  {
    id: 1,
    src: CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/stars.svg',
    alt: 'stars SVG',
    text: '4.9 out of 5 stars from 25,000+ customers.',
    boldText:  ['4.9 out of 5 stars'] ,
  },
  {
    id: 2,
    src: CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/peoples.webp',
    alt: 'peoples',
    text: ' Our branding community stands 200,000+ strong',
    boldText: ['200,000+'] ,
  },
  {
    id: 3,
    src: CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/sharing-files.svg',
    alt: 'sharing files SVG',
    text: 'Our 140+ Industries supported across more than  85 countries – and counting.',
    boldText: [
       '140+ Industries',
       '85 countries' 
    ],
  },
];
