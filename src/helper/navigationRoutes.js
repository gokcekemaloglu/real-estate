export const getNavigationRoutes = (isAdmin, token, currentUserId) => {
  const routes = [
    { path: "/", label: "Anasayfa" },
    { path: "/properties", label: "İlanlar" },
    { path: "/about", label: "Hakkımızda" },
    { path: "/contact", label: "İletişim" },
  ];

  if (token  && currentUserId) {
    routes.push({ path: `/profile/${currentUserId}`, label: "Profilim / Güncelle" });
  }

  if (isAdmin) {
    routes.push({ path: "/admin", label: "Admin Panel" });
  }

  return routes;
};
