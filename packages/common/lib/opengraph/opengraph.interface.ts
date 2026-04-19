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
  role?: string | undefined;
  url: string | URL;
};
type OGAlbum = {
  disc?: number | undefined;
  track?: number | undefined;
  url: string | URL;
};

type OGAudio = OGAudioDescriptor | string | URL;

type OGAudioDescriptor = {
  secureUrl?: string | undefined | URL;
  type?: string | undefined;
  url: string | URL;
};

type OGImage = OGImageDescriptor | string | URL;

type OGImageDescriptor = {
  alt?: string | undefined;
  height?: number | string | undefined;
  secureUrl?: string | undefined | URL;
  type?: string | undefined;
  url: string | URL;
  width?: number | string | undefined;
};

type OGSong = {
  disc?: number | undefined;
  track?: number | undefined;
  url: string | URL;
};

type OGVideo = OGVideoDescriptor | string | URL;

type OGVideoDescriptor = {
  height?: number | string | undefined;
  secureUrl?: string | undefined | URL;
  type?: string | undefined;
  url: string | URL;
  width?: number | string | undefined;
};

type OpenGraphArticle = {
  authors?: Array<string | URL> | null | string | undefined | URL;
  expirationTime?: string | undefined; // datetime
  modifiedTime?: string | undefined; // datetime
  publishedTime?: string | undefined; // datetime
  section?: null | string | undefined;
  tags?: Array<string> | null | string | undefined;
  type: 'article';
} & OpenGraphMetadata;

type OpenGraphBook = {
  authors?: Array<string | URL> | null | string | undefined | URL;
  isbn?: null | string | undefined;
  releaseDate?: null | string | undefined; // datetime
  tags?: Array<string> | null | string | undefined;
  type: 'book';
} & OpenGraphMetadata;

type OpenGraphMetadata = {
  alternateLocale?: Array<Locale> | Locale | undefined;
  audio?: Array<OGAudio> | OGAudio | undefined;
  countryName?: string | undefined;
  description?: string | undefined;
  determiner?: '' | 'a' | 'an' | 'auto' | 'the' | undefined;
  emails?: Array<string> | string | undefined;
  faxNumbers?: Array<string> | string | undefined;
  images?: Array<OGImage> | OGImage | undefined;
  locale?: Locale | undefined;
  phoneNumbers?: Array<string> | string | undefined;
  siteName?: string | undefined;
  title?: string | undefined;
  ttl?: number | undefined;
  url?: null | string | undefined | URL;
  videos?: Array<OGVideo> | OGVideo | undefined;
};

type OpenGraphMusicAlbum = {
  musicians?: Array<string | URL> | null | string | undefined | URL;
  releaseDate?: null | string | undefined; // datetime
  songs?:
    | Array<OGSong | string | URL>
    | null
    | OGSong
    | string
    | undefined
    | URL;
  type: 'music.album';
} & OpenGraphMetadata;

type OpenGraphMusicPlaylist = {
  creators?: Array<string | URL> | null | string | undefined | URL;
  songs?:
    | Array<OGSong | string | URL>
    | null
    | OGSong
    | string
    | undefined
    | URL;
  type: 'music.playlist';
} & OpenGraphMetadata;

type OpenGraphMusicSong = {
  albums?:
    | Array<OGAlbum | string | URL>
    | null
    | OGAlbum
    | string
    | undefined
    | URL;
  duration?: null | number | undefined;
  musicians?: Array<string | URL> | null | string | undefined | URL;
  type: 'music.song';
} & OpenGraphMetadata;

type OpenGraphProfile = {
  firstName?: null | string | undefined;
  gender?: null | string | undefined;
  lastName?: null | string | undefined;
  type: 'profile';
  username?: null | string | undefined;
} & OpenGraphMetadata;

type OpenGraphRadioStation = {
  creators?: Array<string | URL> | null | string | undefined | URL;
  type: 'music.radio_station';
} & OpenGraphMetadata;

type OpenGraphVideoEpisode = {
  actors?:
    | Array<OGActor | string | URL>
    | null
    | OGActor
    | string
    | undefined
    | URL;
  directors?: Array<string | URL> | null | string | undefined | URL;
  duration?: null | number | undefined;
  releaseDate?: null | string | undefined; // datetime
  series?: null | string | undefined | URL;
  tags?: Array<string> | null | string | undefined;
  type: 'video.episode';
  writers?: Array<string | URL> | null | string | undefined | URL;
} & OpenGraphMetadata;

type OpenGraphVideoMovie = {
  actors?:
    | Array<OGActor | string | URL>
    | null
    | OGActor
    | string
    | undefined
    | URL;
  directors?: Array<string | URL> | null | string | undefined | URL;
  duration?: null | number | undefined;
  releaseDate?: null | string | undefined; // datetime
  tags?: Array<string> | null | string | undefined;
  type: 'video.movie';
  writers?: Array<string | URL> | null | string | undefined | URL;
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
