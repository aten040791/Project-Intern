const slugify = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };
  
  module.exports = slugify;
  