// ============================================================================
// SUPABASE CLIENT CONFIGURATION & MULTI-CAFE HELPER
// ============================================================================

window.TENTANG_KOPI_CONFIG = {
  SUPABASE_URL:
    (window.__ENV__ && window.__ENV__.PUBLIC_SUPABASE_URL) ||
    "https://iiojetrkbfrfqbhnixuo.supabase.co",

  SUPABASE_ANON_KEY:
    (window.__ENV__ && window.__ENV__.PUBLIC_SUPABASE_ANON_KEY) ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpb2pldHJrYmZyZnFiaG5peHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxNjU5MjksImV4cCI6MjEwODc0MTkyOX0.yUtKBqapX3DJrSxS6NLfIxvLaXZY1lZEmwFoNkq1I7c",

  STORAGE_BUCKET_NAME: "cafe-assets",
  FALLBACK_PLACEHOLDER_IMG: "logo.jpg",
  GOFOOD_ORDER_URL:
    "https://gofood.co.id/jakarta/restaurant/tentang-kopi-sukmajaya-f95616be-e5a2-4c9c-bc15-4b75093b2e9b"
};

(function () {
  let cachedClient = null;

  window.isSupabaseConfigured = function () {
    const cfg = window.TENTANG_KOPI_CONFIG;
    if (!cfg || !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) return false;
    return (
      !cfg.SUPABASE_URL.includes("MASUKKAN_PROJECT_URL") &&
      !cfg.SUPABASE_ANON_KEY.includes("MASUKKAN_PUBLISHABLE_KEY")
    );
  };

  window.getSupabaseClient = function () {
    if (cachedClient) return cachedClient;
    if (!window.isSupabaseConfigured()) return null;
    if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
      console.warn("Library @supabase/supabase-js belum dimuat.");
      return null;
    }
    const cfg = window.TENTANG_KOPI_CONFIG;
    cachedClient = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return cachedClient;
  };

  window.getActiveCafeSlug = function () {
    const params = new URLSearchParams(window.location.search);
    const fromParam = params.get("kafe") || params.get("cafe");
    if (fromParam) {
      return fromParam.toLowerCase().trim().replace(/[^a-z0-9-]/g, "");
    }
    return "tentang-kopi";
  };

  window.normalizeMenuItem = function (row) {
    if (!row) return null;
    return {
      id: row.id,
      cafeSlug: row.cafe_slug || "tentang-kopi",
      slug: row.slug || null,
      name: row.name || "Menu Tanpa Nama",
      categoryId: row.category || "signature-coffee",
      price: Number(row.price) || 0,
      isAvailable: row.is_available ?? true,
      isPromo: row.is_promo ?? false,
      promoPrice: row.promo_price !== null && row.promo_price !== undefined ? Number(row.promo_price) : null,
      description: row.description || "",
      attributes: Array.isArray(row.attributes) ? row.attributes : [],
      badge: row.badge || null,
      imageUrl: row.image_url || window.TENTANG_KOPI_CONFIG.FALLBACK_PLACEHOLDER_IMG,
      sortOrder: Number(row.sort_order) || 100,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  };
})();