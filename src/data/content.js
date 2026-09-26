export const catalog = [
  ['Sodium', 'Mods', 'Performance', '1.21.5', '62.8M', '#7abf67'],
  ['Complementary', 'Shaders', 'Cinematic', '1.21.x', '18.2M', '#ef9c50'],
  ['Fresh Animations', 'Texture Packs', 'Vanilla+', '1.21.4', '12.4M', '#65a6ba'],
  ['Terralith', 'Data Packs', 'Worldgen', '1.21.x', '24.1M', '#aa8062'],
  ['Iris Shaders', 'Mods', 'Graphics', '1.21.5', '38.7M', '#9c83dc'],
  ['Distant Horizons', 'Mods', 'Exploration', '1.21.4', '14.9M', '#6383b9'],
].map(([name, type, meta, version, downloads, color]) => ({
  name,
  type,
  meta,
  version,
  downloads,
  color,
}))

export const servers = [
  ['Hearth', 'Cozy survival, player towns, and weekly events.', '1,284', '2,000', 24, 'Survival', 'NA East', '#84bd83'],
  ['Monument', 'Competitive minigames with a modern twist.', '843', '1,500', 38, 'Minigames', 'EU West', '#bf8cda'],
  ['Driftwood', 'A community-led oceanic adventure.', '392', '800', 42, 'Adventure', 'NA West', '#79a8c9'],
  ['Arcadia', 'Creative plots and collaborative building.', '706', '1,000', 55, 'Creative', 'Asia', '#d6a26a'],
]

export const programs = [
  ['Creator Partner', 'Grow your audience with launch-ready distribution and collaborative opportunities.', 'spark'],
  ['Server Partner', 'Help players discover your server with verified listings, insights, and tools.', 'server'],
  ['Mod Creator', 'Publish, manage, and learn from your work across the Axiom ecosystem.', 'cube'],
  ['Developer', 'Build extensions and integrations with future APIs and resources.', 'layers'],
  ['Community Contributor', 'Support the ecosystem through guides, localization, and feedback.', 'globe'],
  ['Beta Testing', 'Shape new features before release and share structured feedback.', 'shield'],
]
