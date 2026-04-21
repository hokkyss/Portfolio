export type Icons = {
  /**
   * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
   * rel="apple-touch-icon"
   */
  apple?: Icon[];
  /** rel="icon" */
  icon?: Icon[];
  /** rel inferred from descriptor, defaults to "icon" */
  other?: IconDescriptor[];
  /** rel="shortcut icon" */
  shortcut?: Icon[];
};

type Icon = IconDescriptor | IconURL;

type IconDescriptor = {
  color?: string;
  /**
   * @see https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority
   */
  fetchPriority?: 'auto' | 'high' | 'low';
  media?: string;
  /** defaults to rel="icon" unless superseded by Icons map */
  rel?: string;
  sizes?: string;
  type?: string;
  url: string | URL;
};

type IconURL = string | URL;
