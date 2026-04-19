export type Manifest = {
  background_color?: string | undefined;
  categories?: string[] | undefined;
  description?: string | undefined;
  dir?: 'auto' | 'ltr' | 'rtl' | undefined;
  display?: 'browser' | 'fullscreen' | 'minimal-ui' | 'standalone' | undefined;
  display_override?:
    | (
      | 'browser'
      | 'fullscreen'
      | 'minimal-ui'
      | 'standalone'
      | 'window-controls-overlay'
    )[]
    | undefined;
  file_handlers?:
    | {
      accept: {
        [mimeType: string]: string[];
      };
      action: string;
    }[]
    | undefined;
  icons?: Icon[] | undefined;
  id?: string | undefined;
  lang?: string | undefined;
  launch_handler?:
    | {
      client_mode: ClientModeEnum | ClientModeEnum[];
    }
    | undefined;
  name?: string | undefined;
  orientation?:
    | 'any'
    | 'landscape-primary'
    | 'landscape-secondary'
    | 'landscape'
    | 'natural'
    | 'portrait-primary'
    | 'portrait-secondary'
    | 'portrait'
    | undefined;
  prefer_related_applications?: boolean | undefined;
  protocol_handlers?:
    | {
      protocol: string;
      url: string;
    }[]
    | undefined;
  related_applications?:
    | {
      id?: string | undefined;
      platform: string;
      url: string;
    }[]
    | undefined;
  scope?: string | undefined;
  screenshots?:
    | {
      form_factor?: 'narrow' | 'wide' | undefined;
      label?: string | undefined;
      platform?:
        | 'android'
        | 'chrome_web_store'
        | 'chromeos'
        | 'ios'
        | 'ipados'
        | 'itunes'
        | 'kaios'
        | 'macos'
        | 'microsoft-inbox'
        | 'microsoft-store'
        | 'play'
        | 'windows'
        | 'xbox'
        | undefined;
      sizes?: string | undefined;
      src: string;
      type?: string | undefined;
    }[]
    | undefined;
  share_target?:
    | {
      action: string;
      enctype?:
        | 'application/x-www-form-urlencoded'
        | 'multipart/form-data'
        | undefined;
      method?: 'get' | 'GET' | 'post' | 'POST' | undefined;
      params: {
        files?: File | File[] | undefined;
        text?: string | undefined;
        title?: string | undefined;
        url?: string | undefined;
      };
    }
    | undefined;
  short_name?: string | undefined;
  shortcuts?:
    | {
      description?: string | undefined;
      icons?: Icon[] | undefined;
      name: string;
      short_name?: string | undefined;
      url: string;
    }[]
    | undefined;
  start_url?: string | undefined;
  theme_color?: string | undefined;
};

type ClientModeEnum
  = | 'auto'
    | 'focus-existing'
    | 'navigate-existing'
    | 'navigate-new';

type File = {
  accept: string | string[];
  name: string;
};

type Icon = {
  purpose?: 'any' | 'maskable' | 'monochrome' | undefined;
  sizes?: string | undefined;
  src: string;
  type?: string | undefined;
};
