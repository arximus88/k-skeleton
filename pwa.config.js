export default {
    manifest: {
      name: "kharchenko-work",
      short_name: "Borys's Place",
      description: 'Borys Kharchenko personal portfolio',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#1a202c',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable any',
        },
      ],
    },
  };
  