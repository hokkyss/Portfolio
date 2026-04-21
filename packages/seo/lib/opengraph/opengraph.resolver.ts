import { match } from 'ts-pattern';
import type { SeoMetadata } from '../types';
import type { OpenGraph } from './opengraph.interface';

/**
 * Create a opengraph meta tags properties from OpenGraph configuration defined using `defineOpenGraph`
 * @param data - OpenGraph configuration defined using `defineOpenGraph`
 * @param og
 * @returns opengraph meta tags properties
 * @see https://ogp.me/
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/metadata.tsx#L807 Source implementation}
 */
export function resolveOpenGraph(data: OpenGraph): SeoMetadata {
  const metadata: SeoMetadata = {
    links: [],
    metas: [],
  };

  if (data.determiner) {
    metadata.metas.push({
      content: data.determiner,
      property: 'og:determiner',
    });
  }

  if (data.title) {
    metadata.metas.push({
      content: data.title,
      property: 'og:title',
    });
  }
  if (data.description) {
    metadata.metas.push({
      content: data.description,
      property: 'og:description',
    });
  }
  if (data.url) {
    metadata.metas.push({
      content: data.url.toString(),
      property: 'og:url',
    });
  }
  if (data.siteName) {
    metadata.metas.push({
      content: data.siteName,
      property: 'og:site_name',
    });
  }
  if (data.locale) {
    metadata.metas.push({
      content: data.locale,
      property: 'og:locale',
    });
  }
  if (data.countryName) {
    metadata.metas.push({
      content: data.countryName,
      property: 'og:country_name',
    });
  }
  if (data.ttl != null) {
    metadata.metas.push({
      content: data.ttl.toString(),
      property: 'og:ttl',
    });
  }

  if (data.images) {
    for (const image of data.images) {
      if (typeof image === 'string' || image instanceof URL) {
        metadata.metas.push({ content: image.toString(), property: 'og:image' });
      } else {
        if (image.url) {
          metadata.metas.push({ content: image.url.toString(), property: 'og:image' });
        }
        if (image.secureUrl) {
          metadata.metas.push({ content: image.secureUrl.toString(), property: 'og:image:secure_url' });
        }
        if (image.type) {
          metadata.metas.push({ content: image.type, property: 'og:image:type' });
        }
        if (image.width) {
          metadata.metas.push({ content: String(image.width), property: 'og:image:width' });
        }
        if (image.height) {
          metadata.metas.push({ content: String(image.height), property: 'og:image:height' });
        }
        if (image.alt) {
          metadata.metas.push({ content: image.alt, property: 'og:image:alt' });
        }
      }
    }
  }

  if (data.videos) {
    for (const video of data.videos) {
      if (typeof video === 'string' || video instanceof URL) {
        metadata.metas.push({ content: video.toString(), property: 'og:video' });
      } else {
        if (video.url) {
          metadata.metas.push({ content: video.url.toString(), property: 'og:video' });
        }
        if (video.secureUrl) {
          metadata.metas.push({ content: String(video.secureUrl), property: 'og:video:secure_url' });
        }
        if (video.type) {
          metadata.metas.push({ content: video.type, property: 'og:video:type' });
        }
        if (video.width) {
          metadata.metas.push({ content: String(video.width), property: 'og:video:width' });
        }
        if (video.height) {
          metadata.metas.push({ content: String(video.height), property: 'og:video:height' });
        }
      }
    }
  }

  if (data.audio) {
    for (const audio of data.audio) {
      if (typeof audio === 'string' || audio instanceof URL) {
        metadata.metas.push({ content: audio.toString(), property: 'og:audio' });
      } else {
        if (audio.url) {
          metadata.metas.push({ content: audio.url.toString(), property: 'og:audio' });
        }
        if (audio.secureUrl) {
          metadata.metas.push({ content: audio.secureUrl.toString(), property: 'og:audio:secure_url' });
        }
        if (audio.type) {
          metadata.metas.push({ content: audio.type, property: 'og:audio:type' });
        }
      }
    }
  }

  if (data.emails) {
    for (const email of data.emails) {
      metadata.metas.push({ content: email, property: 'og:email' });
    }
  }
  if (data.phoneNumbers) {
    for (const phone of data.phoneNumbers) {
      metadata.metas.push({ content: phone, property: 'og:phone_number' });
    }
  }
  if (data.faxNumbers) {
    for (const fax of data.faxNumbers) {
      metadata.metas.push({ content: fax, property: 'og:fax_number' });
    }
  }
  if (data.alternateLocale) {
    for (const locale of data.alternateLocale) {
      metadata.metas.push({ content: locale, property: 'og:locale:alternate' });
    }
  }

  // OG type-specific tags
  if ('type' in data) {
    metadata.metas.push({
      content: data.type,
      property: 'og:type',
    });

    match(data)
      .returnType<void>()
      .when((og) => og.type === 'article', (og) => {
        if (og.publishedTime) {
          metadata.metas.push({ content: og.publishedTime.toString(), property: 'article:published_time' });
        }
        if (og.modifiedTime) {
          metadata.metas.push({
            content: og.modifiedTime.toString(),
            property: 'article:modified_time',
          });
        }
        if (og.expirationTime) {
          metadata.metas.push({
            content: og.expirationTime.toString(),
            property: 'article:expiration_time',
          });
        }
        if (og.authors) {
          for (const author of og.authors) {
            metadata.metas.push({
              content: author.toString(),
              property: 'article:author',
            });
          }
        }
        if (og.section) {
          metadata.metas.push({
            content: og.section,
            property: 'article:section',
          });
        }
        if (og.tags) {
          for (const tag of og.tags) {
            metadata.metas.push({
              content: tag,
              property: 'article:tag',
            });
          }
        }
      })
      .when((og) => og.type === 'book', (og) => {
        if (og.isbn) {
          metadata.metas.push({
            content: og.isbn,
            property: 'book:isbn',
          });
        }
        if (og.releaseDate) {
          metadata.metas.push({
            content: og.releaseDate,
            property: 'book:release_date',
          });
        }
        if (og.authors) {
          for (const author of og.authors) {
            metadata.metas.push({
              content: author.toString(),
              property: 'book:author',
            });
          }
        }
        if (og.tags) {
          for (const tag of og.tags) {
            metadata.metas.push({
              content: tag,
              property: 'book:tag',
            });
          }
        }
      })
      .when((og) => og.type === 'music.album', (og) => {
        if (og.songs) {
          for (const song of og.songs) {
            if (typeof song === 'string' || song instanceof URL) {
              metadata.metas.push({
                content: song.toString(),
                property: 'music:song',
              });
            } else {
              if (song.url) {
                metadata.metas.push({
                  content: song.url.toString(),
                  property: 'music:song',
                });
              }
              if (song.disc != null) {
                metadata.metas.push({
                  content: song.disc.toString(),
                  property: 'music:song:disc',
                });
              }
              if (song.track != null) {
                metadata.metas.push({
                  content: song.track.toString(),
                  property: 'music:song:track',
                });
              }
            }
          }
        }
        if (og.musicians) {
          for (const musician of og.musicians) {
            metadata.metas.push({
              content: musician.toString(),
              property: 'music:musician',
            });
          }
        }
        if (og.releaseDate) {
          metadata.metas.push({
            content: og.releaseDate.toString(),
            property: 'music:release_date',
          });
        }
      })
      .when((og) => og.type === 'music.playlist', (og) => {
        if (og.songs) {
          for (const song of og.songs) {
            if (typeof song === 'string' || song instanceof URL) {
              metadata.metas.push({
                content: song.toString(),
                property: 'music:song',
              });
            } else {
              if (song.url) {
                metadata.metas.push({
                  content: song.url.toString(),
                  property: 'music:song',
                });
              }
              if (song.disc != null) {
                metadata.metas.push({
                  content: song.disc.toString(),
                  property: 'music:song:disc',
                });
              }
              if (song.track != null) {
                metadata.metas.push({
                  content: song.track.toString(),
                  property: 'music:song:track',
                });
              }
            }
          }
        }
        if (og.creators) {
          for (const creator of og.creators) {
            metadata.metas.push({
              content: creator.toString(),
              property: 'music:creator',
            });
          }
        }
      })
      .when((og) => og.type === 'music.radio_station', (og) => {
        if (og.creators) {
          for (const creator of og.creators) {
            metadata.metas.push({
              content: creator.toString(),
              property: 'music:creator',
            });
          }
        }
      })
      .when((og) => og.type === 'music.song', (og) => {
        if (og.duration != null) {
          metadata.metas.push({
            content: og.duration.toString(),
            property: 'music:duration',
          });
        }
        if (og.albums) {
          for (const album of og.albums) {
            if (typeof album === 'string' || album instanceof URL) {
              metadata.metas.push({
                content: album.toString(),
                property: 'music:album',
              });
            } else {
              if (album.url) {
                metadata.metas.push({
                  content: album.url.toString(),
                  property: 'music:album',
                });
              }
              if (album.disc != null) {
                metadata.metas.push({
                  content: album.disc.toString(),
                  property: 'music:album:disc',
                });
              }
              if (album.track != null) {
                metadata.metas.push({
                  content: album.track.toString(),
                  property: 'music:album:track',
                });
              }
            }
          }
        }
        if (og.musicians) {
          for (const musician of og.musicians) {
            metadata.metas.push({
              content: musician.toString(),
              property: 'music:musician',
            });
          }
        }
      })
      .when((og) => og.type === 'profile', (og) => {
        if (og.firstName) {
          metadata.metas.push({
            content: og.firstName,
            property: 'profile:first_name',
          });
        }
        if (og.lastName) {
          metadata.metas.push({
            content: og.lastName,
            property: 'profile:last_name',
          });
        }
        if (og.username) {
          metadata.metas.push({
            content: og.username,
            property: 'profile:username',
          });
        }
        if (og.gender) {
          metadata.metas.push({
            content: og.gender,
            property: 'profile:gender',
          });
        }
      })
      .when((og) => og.type === 'video.episode', (og) => {
        if (og.actors) {
          for (const actor of og.actors) {
            if (typeof actor === 'string' || actor instanceof URL) {
              metadata.metas.push({
                content: actor.toString(),
                property: 'video:actor',
              });
            } else {
              if (actor.url) {
                metadata.metas.push({
                  content: actor.url.toString(),
                  property: 'video:actor',
                });
              }
              if (actor.role) {
                metadata.metas.push({
                  content: actor.role,
                  property: 'video:actor:role',
                });
              }
            }
          }
        }
        if (og.directors) {
          for (const director of og.directors) {
            metadata.metas.push({
              content: director.toString(),
              property: 'video:director',
            });
          }
        }
        if (og.writers) {
          for (const writer of og.writers) {
            metadata.metas.push({
              content: writer.toString(),
              property: 'video:writer',
            });
          }
        }
        if (typeof og.duration !== 'undefined') {
          metadata.metas.push({
            content: og.duration.toString(),
            property: 'video:duration',
          });
        }
        if (og.releaseDate) {
          metadata.metas.push({
            content: og.releaseDate,
            property: 'video:release_date',
          });
        }
        if (og.tags) {
          for (const tag of og.tags) {
            metadata.metas.push({
              content: tag,
              property: 'video:tag',
            });
          }
        }
        if (og.series) {
          metadata.metas.push({
            content: og.series.toString(),
            property: 'video:series',
          });
        }
      })
      .when((og) => og.type === 'video.movie', (og) => {
        if (og.actors) {
          for (const actor of og.actors) {
            if (typeof actor === 'string' || actor instanceof URL) {
              metadata.metas.push({
                content: actor.toString(),
                property: 'video:actor',
              });
            } else {
              if (actor.url) {
                metadata.metas.push({
                  content: actor.url.toString(),
                  property: 'video:actor',
                });
              }
              if (actor.role) {
                metadata.metas.push({
                  content: actor.role,
                  property: 'video:actor:role',
                });
              }
            }
          }
        }
        if (og.directors) {
          for (const director of og.directors) {
            metadata.metas.push({
              content: director.toString(),
              property: 'video:director',
            });
          }
        }
        if (og.writers) {
          for (const writer of og.writers) {
            metadata.metas.push({
              content: writer.toString(),
              property: 'video:writer',
            });
          }
        }
        if (og.duration != null) {
          metadata.metas.push({
            content: og.duration.toString(),
            property: 'video:duration',
          });
        }
        if (og.releaseDate) {
          metadata.metas.push({
            content: og.releaseDate.toString(),
            property: 'video:release_date',
          });
        }
        if (og.tags) {
          for (const tag of og.tags) {
            metadata.metas.push({
              content: tag,
              property: 'video:tag',
            });
          }
        }
      })
      .when((og) => og.type === 'video.other', () => {

      })
      .when((og) => og.type === 'video.tv_show', () => {})
      .when((og) => og.type === 'website', () => {})
      .otherwise((v) => {
        throw new Error(`resolveOpenGraph: invalid OpenGraph type: ${v.type}`);
      });
  }

  return metadata;
}
