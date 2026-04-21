/**
 * @see {@link https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/metadata/types/opengraph-types.ts#L17 Source}
 */

export type OpenGraph
  = | OpenGraphArticle
    | OpenGraphBook
    | OpenGraphMetadata
    | OpenGraphMusicAlbum
    | OpenGraphMusicPlaylist
    | OpenGraphMusicSong
    | OpenGraphProfile
    | OpenGraphRadioStation
    | OpenGraphVideoEpisode
    | OpenGraphVideoMovie
    | OpenGraphVideoOther
    | OpenGraphVideoTVShow
    | OpenGraphWebsite;

export type OpenGraphType
  = | 'article'
    | 'book'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'music.song'
    | 'profile'
    | 'video.episode'
    | 'video.movie'
    | 'video.other'
    | 'video.tv_show'
    | 'website';

// update this type to reflect actual locales
type Locale = string;

type OGActor = {
  role?: string;
  url: string | URL;
};
type OGAlbum = {
  disc?: number;
  track?: number;
  url: string | URL;
};

type OGAudio = OGAudioDescriptor | string | URL;

type OGAudioDescriptor = {
  secureUrl?: string | URL;
  type?: string;
  url: string | URL;
};

type OGImage = OGImageDescriptor | string | URL;

type OGImageDescriptor = {
  alt?: string;
  height?: number | string;
  secureUrl?: string | URL;
  type?: string;
  url: string | URL;
  width?: number | string;
};

type OGSong = {
  disc?: number;
  track?: number;
  url: string | URL;
};

type OGVideo = OGVideoDescriptor | string | URL;

type OGVideoDescriptor = {
  height?: number | string;
  secureUrl?: string | URL;
  type?: string;
  url: string | URL;
  width?: number | string;
};

type OpenGraphArticle = {
  authors?: Array<string | URL>;
  expirationTime?: string; // datetime
  modifiedTime?: string; // datetime
  publishedTime?: string; // datetime
  section?: string;
  tags?: Array<string>;
  type: 'article';
} & OpenGraphMetadata;

type OpenGraphBook = {
  authors?: Array<string | URL>;
  isbn?: string;
  releaseDate?: string; // datetime
  tags?: Array<string>;
  type: 'book';
} & OpenGraphMetadata;

type OpenGraphMetadata = {
  alternateLocale?: Array<Locale>;
  audio?: Array<OGAudio>;
  countryName?: string;
  description?: string;
  determiner?: '' | 'a' | 'an' | 'auto' | 'the';
  emails?: Array<string>;
  faxNumbers?: Array<string>;
  images?: Array<OGImage>;
  locale?: Locale;
  phoneNumbers?: Array<string>;
  siteName?: string;
  title?: string;
  ttl?: number;
  url?: string | URL;
  videos?: Array<OGVideo>;
};

type OpenGraphMusicAlbum = {
  musicians?: Array<string | URL>;
  releaseDate?: string; // datetime
  songs?: Array<OGSong | string | URL>;
  type: 'music.album';
} & OpenGraphMetadata;

type OpenGraphMusicPlaylist = {
  creators?: Array<string | URL>;
  songs?: Array<OGSong | string | URL>;
  type: 'music.playlist';
} & OpenGraphMetadata;

type OpenGraphMusicSong = {
  albums?: Array<OGAlbum | string | URL>;
  duration?: number;
  musicians?: Array<string | URL>;
  type: 'music.song';
} & OpenGraphMetadata;

type OpenGraphProfile = {
  firstName?: string;
  gender?: string;
  lastName?: string;
  type: 'profile';
  username?: string;
} & OpenGraphMetadata;

type OpenGraphRadioStation = {
  creators?: Array<string | URL>;
  type: 'music.radio_station';
} & OpenGraphMetadata;

type OpenGraphVideoEpisode = {
  actors?: Array<OGActor | string | URL>;
  directors?: Array<string | URL>;
  duration?: number;
  releaseDate?: string; // datetime
  series?: string | URL;
  tags?: Array<string>;
  type: 'video.episode';
  writers?: Array<string | URL>;
} & OpenGraphMetadata;

type OpenGraphVideoMovie = {
  actors?: Array<OGActor | string | URL>;
  directors?: Array<string | URL>;
  duration?: number;
  releaseDate?: string; // datetime
  tags?: Array<string>;
  type: 'video.movie';
  writers?: Array<string | URL>;
} & OpenGraphMetadata;

type OpenGraphVideoOther = {
  type: 'video.other';
} & OpenGraphMetadata;

type OpenGraphVideoTVShow = {
  type: 'video.tv_show';
} & OpenGraphMetadata;

type OpenGraphWebsite = {
  type: 'website';
} & OpenGraphMetadata;
