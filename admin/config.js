// Ganti dengan username GitHub Anda
const GITHUB_USERNAME = "MahesaTafriyan"; 
// Ganti dengan nama repository GitHub Anda  
const REPO_NAME = "mahesa-portfolio";

CMS.init({
  config: {
    backend: {
      name: "github",
      repo: `${GITHUB_USERNAME}/${REPO_NAME}`,
      branch: "main",
    },
    local_backend: true, // Untuk development lokal
    media_folder: "images/uploads",
    public_folder: "/images/uploads",
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        folder: "content/blog",
        create: true,
        slug: "{{slug}}",
        fields: [
          { label: "Title", name: "title", widget: "string", required: true },
          { label: "Publish Date", name: "date", widget: "datetime", required: true },
          { label: "Featured Image", name: "thumbnail", widget: "image", required: false },
          { label: "Excerpt", name: "excerpt", widget: "text", required: false },
          { label: "Body", name: "body", widget: "markdown", required: true },
          { label: "Tags", name: "tags", widget: "list", required: false },
        ],
      },
    ],
  },
});
