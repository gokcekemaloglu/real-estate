export const getNavigationRoutes = (isAdmin, token, currentUserId) => {
  const routes = [
    { path: "/", label: "Ana Sayfa" },
    { path: "/properties", label: "İlanlar" },
    { path: "/about", label: "Hakkımızda" },
    { path: "/contact", label: "İletİşİm" },
  ];

  if (token) {
    routes.push({ path: `/profile/${currentUserId}`, label: "Hesabım / Profil Güncelle" });
  }

  if (isAdmin) {
    routes.push({ path: "/admin", label: "Admİn Panel" });
  }

  return routes;
};
